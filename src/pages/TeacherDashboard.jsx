import React, { useState } from "react";
import teacherData from "../data/TeacherData";
import "./teacher.css";

const TeacherDashboard = () => {
  const { profile, batches, programs, attendanceTypes, courses, dummyAttendanceList } = teacherData;

  const [state, setState] = useState("form"); 
  const [selectedBatch, setSelectedBatch] = useState("");
const [selectedProgram, setSelectedProgram] = useState("");
const [selectedType, setSelectedType] = useState("");
const [selectedCourse, setSelectedCourse] = useState("");
const [selectedSlots, setSelectedSlots] = useState("");
const [selectedDate, setSelectedDate] = useState("");



  return (
    <div className="teacher-wrapper">

      {/* --- Teacher Profile Card --- */}
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

      {/* --- Right Side Content --- */}
      <div className="right-section">

        {/* Welcome Bar */}
        <div className="welcome-banner">
          Welcome back, {profile.name}!
        </div>


       {/* ---------------- STATE 1: ATTENDANCE FORM ---------------- */}
{state === "form" && (
  <div className="card">
    <div className="card-title">Live Attendance Marking System</div>
    <div className="card-content">

      {/* BATCH */}
      <label>Batch</label>
      <select
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
      >
        <option value="">Select batch</option>
        {batches.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      {/* PROGRAM */}
      <label>Program</label>
      <select
        value={selectedProgram}
        onChange={(e) => setSelectedProgram(e.target.value)}
      >
        <option value="">Select program</option>
        {programs.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* DATE */}
      <label>Date</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* ATTENDANCE TYPE */}
      <label>Attendance Type</label>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Select type</option>
        {attendanceTypes.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      {/* COURSE SELECT */}
      <label>Course Name</label>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select course</option>
        {courses.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} – {c.name}
          </option>
        ))}
      </select>

      {/* NUMBER OF SLOTS */}
      <label>Number of Slots</label>
      <input
        type="number"
        placeholder="e.g., 2"
        value={selectedSlots}
        onChange={(e) => setSelectedSlots(e.target.value)}
      />

      {/* START BUTTON */}
      <button
        className="start-btn"
        onClick={() => {
          if (!selectedCourse || !selectedSlots) {
            alert("Please select course and slots.");
            return;
          }
          setState("active");
        }}
      >
        ▶ Start Attendance
      </button>

    </div>
  </div>
)}

        {state === "active" && (
  <div className="card active-card">
    <div className="card-title">Live Attendance Marking System</div>

    <div className="active-box">
      <p><strong>🔴 RFID + CV Module Active - Marking Attendance...</strong></p>

      <p><strong>Course:</strong> {selectedCourse || "Not Selected"}</p>

      <p><strong>Total Slots:</strong> {selectedSlots || "0"}</p>
    </div>

    <button className="stop-btn" onClick={() => setState("completed")}>
      ■ Stop Attendance
    </button>
  </div>
)}

        {/* ---------------- STATE 3: COMPLETED ---------------- */}
        {state === "completed" && (
          <div className="card">
            <div className="card-title">Live Attendance Marking System</div>

            <div className="success-box">
              <strong>Attendance Marking Completed!</strong> <br></br><p><strong>Course:</strong> {selectedCourse || "Not Selected"}</p>
              Total Present: {dummyAttendanceList.length} / 2
            </div>

            <div className="final-list">
              <strong>Final Attendance List:</strong>
              <div className="scroll-area">
                {dummyAttendanceList.map(s => (
                  <div className="student-row">
                    <span>{s.name} ({s.roll})</span>
                    <span className={`tag ${s.mode}`}>{s.mode}</span>
                    <span className="time">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="new-btn" onClick={() => setState("form")}>
              Mark New Attendance
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TeacherDashboard;
