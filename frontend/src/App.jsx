// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Login from './components/Login';
import Signup from './components/Signup';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './students/StudentDashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeacherList from './components/TeacherList';
import Footer from './components/footer';
import StudentGuide from './components/StudentGuide';
function App() {
    return (
        <AuthProvider> {/* Wrap with AuthProvider */}
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<TeacherDashboard />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/student-guide" element={<StudentGuide />} />

                </Routes>
                <Footer/>
            </Router>

        </AuthProvider>
    );
}

export default App;
