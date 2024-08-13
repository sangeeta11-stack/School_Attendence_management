const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req, res) => {
    const { fullname, email, phoneNumber, subject, yearsOfExperience, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new teacher instance
        const newTeacher = new Teacher({
            fullname,
            email,
            phoneNumber,
            subject,
            yearsOfExperience,
            password: hashedPassword
        });

        // Save the teacher to the database
        await newTeacher.save();

        // Send a success response
        res.status(201).json({ message: 'Teacher registered successfully!' });
    } catch (err) {
        // Handle any errors
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

        res.json({ token, teacher }); // Return teacher data along with token
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to authenticate and get user details
router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const teacher = await Teacher.findById(decoded.id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Get all teachers
router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        console.error('Error fetching teachers:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
