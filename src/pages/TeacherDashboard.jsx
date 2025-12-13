import React, { useState } from "react";
import teacherData from "../data/TeacherData";
import "./teacher.css";

const TeacherDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  // 🔐 AUTH CHECK
  if (!currentUser || currentUser.role !== "teacher") {
    return <h2>Unauthorized</h2>;
  }

  const teacher = teachers.find(t => t.id === currentUser.id);

  if (!teacher) {
    return <h2>Teacher not found</h2>;
  }

  // Use dummy config + real teacher profile
  const {
    batches,
    programs,
    attendanceTypes,
    courses,
    dummyAttendanceList,
  } = teacherData;

  const profile = {
    name: teacher.name,
    teacherId: teacher.id,
    department: teacher.dept || "N/A",
    coursesTeaching: teacher.courses
      ? teacher.courses.split(",")
      : [],
    avatar: "👩‍🏫"
  };

  // STATES
  const [state, setState] = useState("form");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSlots, setSelectedSlots] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="teacher-wrapper">
      {/* PROFILE */}
      <div className="profile-card">
        <div className="profile-avatar">{profile.avatar}</div>
        <h3>{profile.name}</h3>
        <p><strong>Teacher ID:</strong> {profile.teacherId}</p>
        <p><strong>Department:</strong> {profile.department}</p>

        <div className="teach-list">
          <strong>Courses Teaching:</strong><br />
          {profile.coursesTeaching.join(", ")}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="top-actions">
          <button className="update-btn" onClick={() => setShowUpdateModal(true)}>
            🔄 Update Attendance Request
          </button>
          <button className="btn" onClick={logout}>Logout</button>
        </div>

        <div className="welcome-banner">
          Welcome back, {profile.name}!
        </div>

        {/* ---- REMAINING CODE UNCHANGED ---- */}
        {/* Your form / active / completed state logic stays SAME */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
