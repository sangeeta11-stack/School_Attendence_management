// backend/models/Teacher.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    subject: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    password: { type: String, required: true },
    lastAttendanceDate: { type: Date, default: null } // Add this field
});

module.exports = mongoose.model('Teacher', TeacherSchema);
