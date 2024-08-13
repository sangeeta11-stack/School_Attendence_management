import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import logo from '../assets/user (1).png';
import backgroundImage from '../assets/backgroung.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setTeacher, setIsLoggedIn } = useAuth();

    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 800,
            easing: 'ease-in-out-sine',
            delay: 100,
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setTeacher(response.data.teacher);
            setIsLoggedIn(true);

            if (response.data.teacher) {
                navigate('/dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-blue-900 bg-opacity-75" 
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-md rounded-lg" data-aos="fade-up">
                <div className="text-center mb-6">
                    <img src={logo} alt="Logo" className="mx-auto mb-4 w-24 h-24" />
                    <h1 className="text-2xl font-bold text-gray-700">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <FaLock className="text-gray-500 ml-2" />
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-3 py-2 outline-none sm:text-sm" 
                                placeholder="Enter your password"
                                required 
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Login
                    </button>
                    {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
