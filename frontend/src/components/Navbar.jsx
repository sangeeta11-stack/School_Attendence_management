import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Navbar() {
    const { teacher, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0] + parts[0][1];
    };

    return (
        <nav className="bg-[#12C0CF] p-4 shadow-lg">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link 
                    to="/" 
                    className="text-white text-2xl font-bold hover:text-gray-100 transition duration-300 transform hover:scale-105"
                >
                    Home
                </Link>
                <div className="flex flex-wrap items-center space-x-4">
                    
                    {isLoggedIn && teacher ? (
                        <div className="flex items-center space-x-4">
                         
                            <div className="flex space-x-4">
                            <Link 
                        to="/teachers" 
                        className="text-white hover:text-gray-100 transition duration-300 transform hover:scale-105"
                    >
                        Teachers List
                    </Link>
                                <Link 
                                    to="/dashboard" 
                                    className="text-white hover:text-gray-100 transition duration-300 transform hover:scale-105"
                                >
                                    Teacher Dashboard
                                </Link>
                                <Link 
                                    to="/student-dashboard" 
                                    className="text-white hover:text-gray-100 transition duration-300 transform hover:scale-105"
                                >
                                    Student Dashboard
                                </Link>
                                <div className="flex items-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white rounded-full text-xl font-bold">
                                    {getInitials(teacher.fullname)}
                                </div>
                                <div className="ml-3">
                                    <span className="text-white text-lg hidden sm:block font-semibold">
                                        {teacher.fullname}
                                    </span>
                                    <span className="text-gray-100 text-sm hidden sm:block">
                                        {teacher.email}
                                    </span>
                                </div>
                            </div>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="text-white hover:text-gray-100 transition duration-300 transform hover:scale-105"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="text-white hover:text-gray-100 transition duration-300 transform hover:scale-105"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
