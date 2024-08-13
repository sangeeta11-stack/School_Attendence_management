import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import teachersImage from '../assets/teachers2.jpg';

function AllTeachersList() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 800,
            easing: 'ease-in-out-sine',
            delay: 100,
        });

        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/all');
                console.log('Fetched data:', response.data); // Debugging log
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div 
            className="flex flex-col items-center min-h-screen bg-gray-100" 

        >
            {/* Image section */}
            <section
                id="teachers-list"
                className="w-full h-[300px] bg-cover bg-center rounded-xl mb-8 flex justify-center items-center"
                style={{ backgroundImage: `url(${teachersImage})` }}
                data-aos="zoom-in"
            >
                <h1 className="text-3xl text-white font-semibold bg-black bg-opacity-50 px-4 py-2 rounded">
                    Meet Our Teachers
                </h1>
            </section>

            {/* Teachers List */}
            <div 
                className="w-full max-w-4xl p-6 bg-white bg-opacity-70 border border-gray-200 rounded-lg shadow-md" 
                data-aos="zoom-in"
            >
                <h2 className="text-2xl font-bold mb-6 text-[#12C0CF]">List of All Teachers</h2>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 border-b text-left text-[#12C0CF] font-medium">Full Name</th>
                            <th className="py-3 px-6 border-b text-left text-[#12C0CF] font-medium">Email</th>
                            <th className="py-3 px-6 border-b text-left text-[#12C0CF] font-medium">Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.length > 0 ? (
                            teachers.map((teacher) => (
                                <tr key={teacher._id} className="hover:bg-gray-100" data-aos="zoom-in">
                                    <td className="py-3 px-6 border-b">{teacher.fullname}</td>
                                    <td className="py-3 px-6 border-b">{teacher.email}</td>
                                    <td className="py-3 px-6 border-b">{teacher.subject}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 border-b text-center text-gray-500">
                                    No teachers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllTeachersList;
