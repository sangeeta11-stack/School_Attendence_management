// backend/routes/attendance.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');

router.post('/', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const teacherId = decoded.id;

        const { className, date, attendance } = req.body;

        if (!date || !attendance) {
            return res.status(400).json({ message: 'Date and attendance data are required' });
        }

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const lastSubmissionDate = teacher.lastAttendanceDate;
        const currentDate = new Date(date).toISOString().split('T')[0];

        if (lastSubmissionDate && lastSubmissionDate.toISOString().split('T')[0] === currentDate) {
            return res.status(400).json({ message: 'Attendance already submitted for today' });
        }

        const AttendanceModel = mongoose.model(`Attendance_${className}`, new mongoose.Schema({
            teacherId: String,
            teacherName: String,
            studentId: String,
            name: String,
            date: Date,
            status: String
        }));

        for (const record of attendance) {
            const newAttendance = new AttendanceModel({
                teacherId: teacher._id,
                teacherName: teacher.fullname,
                studentId: record.studentId,
                name: record.name,
                date: date,
                status: record.status
            });

            await newAttendance.save();
        }

        teacher.lastAttendanceDate = new Date(date);
        await teacher.save();

        res.json({ 
            message: 'Attendance submitted successfully', 
            teacher: {
                id: teacher._id,
                name: teacher.fullname
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get attendance records for a specific month and class
router.get('/:className/:month', async (req, res) => {
    const { className, month } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);

        // Parse month to get the start and end dates
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);

        // Define the model for the attendance collection dynamically
        const AttendanceModel = mongoose.models[`Attendance_${className}`] || 
                                mongoose.model(`Attendance_${className}`, new mongoose.Schema({
                                    teacherId: String,
                                    teacherName: String,
                                    studentId: String,
                                    name: String,
                                    date: Date,
                                    status: String
                                }));

        // Query the attendance records for the specified month
        const records = await AttendanceModel.find({
            date: { $gte: startDate, $lt: endDate }
        });

        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
