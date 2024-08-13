import React, { useEffect, useState } from 'react';
import AddStudent from './AddStudent';
import Attendance from './Attendance';
import StudentList from '../students/StudentList'; 
import Aos from 'aos';
import 'aos/dist/aos.css';
import backgroundImage from '../assets/backgroung.jpg';


function TeacherDashboard() {
    const [selectedClass, setSelectedClass] = useState('');
    const [activeView, setActiveView] = useState('');

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
        });
    }, []);

    const handleClassSelection = (e) => {
        setSelectedClass(e.target.value);
        setActiveView(''); // Reset the active view when class is changed
    };

    const handleAddStudentClick = () => {
        setActiveView('addStudent');
    };

    const handleViewStudentsClick = () => {
        setActiveView('viewStudents');
    };

    const handleAttendanceClick = () => {
        setActiveView('attendance');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            
            <div className="mb-4 sm:mb-6 w-full max-w-3xl">
                <select
                    onChange={handleClassSelection}
                    value={selectedClass}
                    className="border-2 border-gray-400 rounded-md p-3 w-full"
                    data-aos="zoom-in"
                >
                    <option value="">Select Class</option>
                    <option value="class-6">Class 6</option>
                    <option value="class-7">Class 7</option>
                    <option value="class-8">Class 8</option>
                </select>
            </div>
            <div className="mb-4 sm:mb-6 w-full max-w-3xl flex flex-col sm:flex-row sm:space-x-4 item-center justify-center">
                <button
                    onClick={handleAddStudentClick}
                    className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 mb-2 sm:mb-0 w-full sm:w-auto"
                    data-aos="zoom-in"
                >  Add Student
                </button>
                <button
                    onClick={handleAttendanceClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 mb-2 sm:mb-0 w-full sm:w-auto"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                >
                    Attendance
                </button>
                <button
                    onClick={handleViewStudentsClick}
                    className="bg-yellow-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-yellow-700 w-full sm:w-auto"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    View Students
                </button>
            </div>

            {selectedClass && activeView === 'addStudent' && (
                <div 
                    className="p-10 bg-white border-4 border-gray-400 rounded-md shadow-xl w-full max-w-4xl mt-6" 
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                    data-aos-easing="ease-in-out"
                >
                    <AddStudent className={selectedClass} />
                </div>
            )}
            {selectedClass && activeView === 'attendance' && (
                <div 
                    className="p-10 bg-white border-4 border-gray-400 rounded-md shadow-xl w-full max-w-4xl mt-6"
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                    data-aos-easing="ease-in-out"
                >                    <Attendance className={selectedClass} />
                </div>
            )}
            {selectedClass && activeView === 'viewStudents' && (
                <div 
                    className="p-10 bg-white border-4 border-gray-400 rounded-md shadow-xl w-full max-w-4xl mt-6" // Increased padding, border, and width
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                    data-aos-easing="ease-in-out"
                >
                    
                    <StudentList className={selectedClass} />
                </div>
            )}
        </div>
    );
}

export default TeacherDashboard;
