const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/Student');

// Add student to a specific class
router.post('/:className/add', async (req, res) => {
    const { className } = req.params;
    const { fullName, fatherName, motherName, address, phoneNumber } = req.body;

    try {
        // Dynamically select the collection based on the className
        const StudentModel = mongoose.model(`Student_${className}`, Student.schema);
        const newStudent = new StudentModel({
            fullName,
            fatherName,
            motherName,
            address,
            phoneNumber,
            class: className
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add student.' });
    }
});


// Get students for a specific class
router.get('/:className', async (req, res) => {
    try {
        const { className } = req.params;
        const StudentModel = mongoose.model(`Student_${className}`, Student.schema); // Use dynamic collection
        const students = await StudentModel.find({});
        
        console.log('Class Name:', className);
        console.log('Students Found:', students);

        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update student data
router.put('/:className/:studentId', async (req, res) => {
    const { className, studentId } = req.params;
    const updatedData = req.body;

    try {
        const StudentModel = mongoose.model(`Student_${className}`, Student.schema);
        const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, updatedData, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update student.' });
    }
});


// Delete student
router.delete('/:className/:studentId', async (req, res) => {
    const { className, studentId } = req.params;
    try {
        const StudentModel = mongoose.model(`Student_${className}`, Student.schema);
        const deletedStudent = await StudentModel.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete student.' });
    }
});



module.exports = router;
