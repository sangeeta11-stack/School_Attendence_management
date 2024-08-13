import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentList({ className }) {
    const [students, setStudents] = useState([]);
    const [editStudent, setEditStudent] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        fatherName: '',
        motherName: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${className}`);
                setStudents(response.data);
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };

        if (className) {
            fetchStudents();
        }
    }, [className]);

    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:5000/api/students/${className}/${studentId}`);
                setStudents(students.filter(student => student._id !== studentId));
            } catch (err) {
                console.error('Failed to delete student:', err);
            }
        }
    };

    const handleEdit = (student) => {
        setEditStudent(student);
        setFormData({
            fullName: student.fullName,
            fatherName: student.fatherName,
            motherName: student.motherName,
            address: student.address,
            phoneNumber: student.phoneNumber
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/students/${className}/${editStudent._id}`, formData);
            setStudents(students.map(student =>
                student._id === editStudent._id ? { ...student, ...formData } : student
            ));
            setEditStudent(null);
        } catch (err) {
            console.error('Failed to update student:', err);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Students in {className}</h2>
            {editStudent ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {Object.keys(formData).map((key) => (
                            <div key={key} className="flex items-center">
                                <label htmlFor={key} className="w-1/3 text-right font-medium mr-4">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleFormChange}
                                    className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">Update</button>
                        <button type="button" onClick={() => setEditStudent(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600">Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father's Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother's Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map(student => (
                                <tr key={student._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fatherName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.motherName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => handleEdit(student)} className="text-blue-500 hover:text-blue-700">Edit</button>
                                        <button onClick={() => handleDelete(student._id)} className="ml-4 text-red-500 hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StudentList;
