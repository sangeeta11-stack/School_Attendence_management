// backend/server.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const studentRoutes = require('./routes/students');
require('dotenv').config();

connectDB();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include 'Authorization'
}));

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes); // Ensure route is correct
app.use('/api/students', studentRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
