import React from "react";
import ProfileCard from "../components/ProfileCard";
import SemesterPerformance from "../components/SemesterPerformance";
import CourseTable from "../components/CourseTable";
import studentData from "../data/StudentData";
import "./student.css";

const StudentDashboard = () => {
  const { profile, overallAttendance, courses } = studentData;

  return (
    <div className="dashboard-wrapper">


  <div className="dashboard-grid">

    {/* LEFT – Profile */}
    <ProfileCard profile={profile} />
   

    {/* RIGHT – Cards */}
    <div className="right-content">
    
      <div className="heading"><h1> Welcome back, John Smith!</h1>
      <button>Logout</button></div>


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
