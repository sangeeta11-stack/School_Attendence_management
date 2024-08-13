import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [teacher, setTeacher] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setTeacher(response.data);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, []);

    const logout = () => {
        localStorage.removeItem('token'); // Clear the token from localStorage
        setTeacher(null); // Clear the teacher state
        setIsLoggedIn(false); // Update the logged-in state
        // Optionally, you could also redirect the user here or handle additional cleanup
    };

    return (
        <AuthContext.Provider value={{ teacher, setTeacher, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
