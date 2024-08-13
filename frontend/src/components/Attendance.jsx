import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance({ className }) {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState('');
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${className}`);
                setStudents(response.data);
                // Initialize records state with default statuses
                setRecords(response.data.map(student => ({
                    studentId: student._id,
                    name: student.fullName,
                    status: 'Absent' // Default status
                })));
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };

        if (className) {
            fetchStudents();
        }
    }, [className]);

    const handleStatusChange = (studentId, status) => {
        setRecords(prevRecords => 
            prevRecords.map(record => 
                record.studentId === studentId 
                ? { ...record, status } 
                : record
            )
        );
    };

    const handleSubmit = async () => {
        if (!date) {
            alert('Please select a date.');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/api/attendance', {
                className,
                date,
                attendance: records
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(response.data.message);
        } catch (err) {
            alert(err.response.data.message || 'An error occurred');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Attendance for {className}</h2>
            <div className="flex justify-center mb-4">
                <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="border border-gray-300 rounded p-2"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-2 px-4 border-b">Student ID</th>
                            <th className="py-2 px-4 border-b">Student Name</th>
                            <th className="py-2 px-4 border-b">Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-center">{student._id}</td>
                                <td className="py-2 px-4 border-b">{student.fullName}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-center space-x-4">
                                        <label className="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                name={`status_${student._id}`} 
                                                checked={records.find(r => r.studentId === student._id)?.status === 'Present'}
                                                onChange={() => handleStatusChange(student._id, 'Present')} 
                                                className="form-radio h-4 w-4 text-green-600"
                                            />
                                            <span className="ml-2">Present</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                name={`status_${student._id}`} 
                                                checked={records.find(r => r.studentId === student._id)?.status === 'Absent'}
                                                onChange={() => handleStatusChange(student._id, 'Absent')} 
                                                className="form-radio h-4 w-4 text-red-600"
                                            />
                                            <span className="ml-2">Absent</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                name={`status_${student._id}`} 
                                                checked={records.find(r => r.studentId === student._id)?.status === 'Leave'}
                                                onChange={() => handleStatusChange(student._id, 'Leave')} 
                                                className="form-radio h-4 w-4 text-yellow-600"
                                            />
                                            <span className="ml-2">Leave</span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                <button 
                    onClick={handleSubmit} 
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
                >
                    Submit Attendance
                </button>
            </div>
        </div>
    );
}

export default Attendance;
