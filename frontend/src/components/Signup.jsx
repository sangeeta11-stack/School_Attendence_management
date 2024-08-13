import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaEnvelope, FaPhone, FaBook, FaCalendarAlt, FaLock, FaLockOpen, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/teamwork.png';
import backgroundImage from '../assets/backgroung.jpg';

function Signup() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle state for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle state for confirm password visibility
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 800,
            easing: 'ease-in-out-sine',
            delay: 100,
        });
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!fullname || !email || !phoneNumber || !subject || !yearsOfExperience || !password || !confirmPassword) {
            return setError('All fields are required');
        }
        if (!validateEmail(email)) {
            return setError('Invalid email format');
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            await axios.post('http://localhost:5000/api/auth/signup', { 
                fullname, 
                email, 
                phoneNumber, 
                subject, 
                yearsOfExperience, 
                password 
            });
            setSuccess('Signup successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000); 
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup');
        }
    };

    return (
        <div 
            className="flex items-center justify-start min-h-screen bg-gray-100"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            <div 
                className="w-full max-w-md p-8 bg-white bg-opacity-70 shadow-md rounded-lg ml-10" 
                data-aos="fade-up"
            >
                <div className="text-center mb-6">
                    <img src={logo} alt="Logo" className="mx-auto mb-4 w-24 h-24" />
                    <h1 className="text-2xl font-bold text-gray-700">Signup</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4" data-aos="fade-left">
                        <label htmlFor="fullname" className="block text-gray-600 text-sm font-medium mb-2">Full Name:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaUser className="text-gray-500 ml-2" />
                            <input 
                                type="text" 
                                id="fullname" 
                                value={fullname} 
                                onChange={(e) => setFullname(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter your full name" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mb-4" data-aos="fade-left" data-aos-delay="100">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaEnvelope className="text-gray-500 ml-2" />
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter your email" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mb-4" data-aos="fade-left" data-aos-delay="200">
                        <label htmlFor="phoneNumber" className="block text-gray-600 text-sm font-medium mb-2">Phone Number:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaPhone className="text-gray-500 ml-2" />
                            <input 
                                type="text" 
                                id="phoneNumber" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter your phone number" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mb-4" data-aos="fade-left" data-aos-delay="300">
                        <label htmlFor="subject" className="block text-gray-600 text-sm font-medium mb-2">Subject:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaBook className="text-gray-500 ml-2" />
                            <input 
                                type="text" 
                                id="subject" 
                                value={subject} 
                                onChange={(e) => setSubject(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter your subject" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mb-4" data-aos="fade-left" data-aos-delay="400">
                        <label htmlFor="yearsOfExperience" className="block text-gray-600 text-sm font-medium mb-2">Years of Experience:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaCalendarAlt className="text-gray-500 ml-2" />
                            <input 
                                type="number" 
                                id="yearsOfExperience" 
                                value={yearsOfExperience} 
                                onChange={(e) => setYearsOfExperience(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter years of experience" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mb-4" data-aos="fade-left" data-aos-delay="500">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaLock className="text-gray-500 ml-2" />
                            <input 
                                type={showPassword ? "text" : "password"} // Toggle input type
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter your password" 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                className="text-gray-500 p-2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="mb-6" 
                    data-aos-delay="600">
                        <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium mb-2">Confirm Password:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaLockOpen className="text-gray-500 ml-2" />
                            <input 
                                type={showConfirmPassword ? "text" : "password"} // Toggle input type
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Confirm your password" 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                                className="text-gray-500 p-2"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Signup
                    </button>
                    {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
                    {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Signup;
