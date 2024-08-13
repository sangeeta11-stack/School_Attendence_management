import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaUser, FaIdCard } from 'react-icons/fa';
import backgroundImage from '../assets/backgroung.jpg';

function StudentDashboard() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [month, setMonth] = useState('');

    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 800,
            easing: 'ease-in-out-sine',
            delay: 100,
        });
    }, []);

    useEffect(() => {
        const fetchAttendanceRecords = async () => {
            if (selectedClass && month) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:5000/api/attendance/${selectedClass}/${month}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setAttendanceRecords(response.data);
                } catch (err) {
                    console.error('Error fetching attendance records:', err);
                }
            }
        };
        fetchAttendanceRecords();
    }, [selectedClass, month]);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            <div
                className="w-full max-w-5xl p-8 bg-white bg-opacity-70 shadow-md rounded-lg"
                data-aos="fade-up"
            >
                <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Student Dashboard</h1>
                <div className="mb-6">
                    <label htmlFor="classSelect" className="block text-lg font-medium mb-2">Select Class:</label>
                    <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                        <FaIdCard className="text-gray-500 ml-2" />
                        <select
                            id="classSelect"
                            onChange={handleClassChange}
                            className="block w-full p-2 border-none outline-none bg-transparent"
                        >
                            <option value="">--Select Class--</option>
                            <option value="class-6">Class 6</option>
                            <option value="class-7">Class 7</option>
                            <option value="class-8">Class 8</option>
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="monthSelect" className="block text-lg font-medium mb-2">Select Month:</label>
                    <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                        <FaCalendarAlt className="text-gray-500 ml-2" />
                        <input
                            type="month"
                            id="monthSelect"
                            onChange={handleMonthChange}
                            className="block w-full p-2 border-none outline-none bg-transparent"
                        />
                    </div>
                </div>
                {attendanceRecords.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {attendanceRecords.map((record, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.teacherId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.teacherName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.studentId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No attendance records found for the selected class and month.</p>
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;
