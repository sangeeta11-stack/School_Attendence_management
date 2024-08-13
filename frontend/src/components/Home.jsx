import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import digitalAttendance from '../assets/DigitalAttendance.webp';
import teachers1 from '../assets/teachers1.jpg';
import teachersStudents from '../assets/teachersStudents.jpg';

const Home = () => {
    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 800,
            easing: 'ease-in-out-sine',
            delay: 100,
        });
    }, []);

    return (
        <div 
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
            style={{ backgroundImage: `url(${digitalAttendance})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="w-full max-w-4xl p-8 bg-white bg-opacity-70 shadow-md rounded-lg text-center" data-aos="fade-up">
                <h1 className="text-5xl font-bold text-gray-700 mb-6">Welcome to the Attendance Management System</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Efficiently track and manage student attendance with our digital solutions.
                </p>
                <div className="flex justify-around mb-8">
                    <Link to="/login" className="w-1/3 p-4 cursor-pointer" data-aos="fade-right">
                        <img src={teachers1} alt="Teachers" className="rounded-md shadow-md" />
                        <h2 className="text-2xl font-semibold text-gray-700 mt-4">For Teachers</h2>
                        <p className="text-gray-600 mt-2">Easily mark and manage student attendance records.</p>
                    </Link>
                    <Link to="/student-guide" className="w-1/3 p-4 cursor-pointer" data-aos="fade-left">
                        <img src={teachersStudents} alt="Teachers and Students" className="rounded-md shadow-md" />
                        <h2 className="text-2xl font-semibold text-gray-700 mt-4">For Students</h2>
                        <p className="text-gray-600 mt-2">Keep track of your attendance and stay updated.</p>
                    </Link>
                </div>
                <button 
                    className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
