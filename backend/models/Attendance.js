const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    teacherId: String,
    teacherName: String,
    studentId: String,
    name: String,
    date: Date,
    status: String
});

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);
module.exports = AttendanceModel;
