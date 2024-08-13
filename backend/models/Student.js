const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    class: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
