import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import SemesterPerformance from "../components/SemesterPerformance";
import CourseTable from "../components/CourseTable";
import students from "../data/StudentData";
import "./student.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  // Read the logged-in user from localStorage and find corresponding student data
  const currentUserStr = localStorage.getItem("currentUser");
  let profile = null;
  let overallAttendance = null;
  let courses = [];

  if (currentUserStr) {
    try {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser && currentUser.role === "student") {
        const student = students.find(s => s.profile.studentId === currentUser.studentId || s.email === currentUser.email);
        if (student) {
          profile = student.profile;
          overallAttendance = student.overallAttendance;
          courses = student.courses;
        }
      }
    } catch (err) {
      // ignore parse errors
    }
  }

  // If no student data found, redirect to login
  React.useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
  }, [profile, navigate]);

  const handleLogout = () => {
    // Clear any stored auth state if you use one (example):
    // localStorage.removeItem('authToken');
    // Then navigate back to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">


  <div className="dashboard-grid">

    {/* LEFT – Profile */}
    <ProfileCard profile={profile} />
   

    {/* RIGHT – Cards */}
    <div className="right-content">
    
      <div className="heading"><h1> Welcome back, {profile ? profile.name : 'Student'}!</h1>
      <button onClick={handleLogout}>Logout</button></div>


      <div className="card">
        <div className="card-title">Current Semester Performance</div>
        <div className="card-content">
          <SemesterPerformance overall={overallAttendance} />
        </div>
      </div>

      <div className="card course-table">
        <div className="card-title">Course-wise Attendance</div>
        <div className="card-content">
          <CourseTable courses={courses} />
        </div>
      </div>

    </div>
  </div>

</div>

  );
};

export default StudentDashboard;
