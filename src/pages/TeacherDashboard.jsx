import React, { useState } from "react";
import teacherData from "../data/TeacherData";
import "./teacher.css";

const TeacherDashboard = () => {
  const {
    profile,
    batches,
    programs,
    attendanceTypes,
    courses,
    dummyAttendanceList,
  } = teacherData;

  // All States
  const [state, setState] = useState("form");

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSlots, setSelectedSlots] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Missing state FIXED
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

      {/* --- Right Section --- */}
      <div className="right-section">
        
        {/* UPDATE ATTENDANCE BUTTON */}
        <div className="top-actions">
          <button className="update-btn" onClick={() => setShowUpdateModal(true)}>
            🔄 Update Attendance Request
          </button>
          <button className="btn">Logout</button>
        </div>

        {/* Welcome Bar */}
        <div className="welcome-banner">
          Welcome back, {profile.name}!
          
        </div>

        

        {/* ---------------- UPDATE ATTENDANCE MODAL ---------------- */}
        {showUpdateModal && (
          <div className="modal-overlay">
            <div className="modal-box">

              <div className="modal-header">
                <h3>Update Attendance Request</h3>
                <span
                  className="close-btn"
                  onClick={() => setShowUpdateModal(false)}
                >
                  ✖
                </span>
              </div>

              <div className="modal-content">
                <label>Roll Number</label>
                <input type="text" placeholder="Enter roll number" />

                <label>Batch</label>
                <select>
                  <option>Select batch</option>
                  {batches.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>

                <label>Program</label>
                <select>
                  <option>Select program</option>
                  {programs.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>

                <label>Course Name</label>
                <select>
                  <option>Select course</option>
                  {courses.map((c) => (
                    <option key={c.code}>{c.code} – {c.name}</option>
                  ))}
                </select>

                <label>Date</label>
                <input type="date" />

                <label>Number of Slots</label>
                <input type="number" placeholder="e.g., 2" />

                <label>Reason for Update</label>
                <input type="text" placeholder="e.g., Student was absent due to illness" />
              </div>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>

                <button className="submit-btn">Submit Request</button>
              </div>

            </div>
          </div>
        )}

        {/* ---------------- STATE 1: FORM ---------------- */}
        {state === "form" && (
          <div className="card">
            <div className="card-title">Live Attendance Marking System</div>

            <div className="card-content">
              <label>Batch</label>
              <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
                <option value="">Select batch</option>
                {batches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <label>Program</label>
              <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
                <option value="">Select program</option>
                {programs.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              <label>Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

              <label>Attendance Type</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Select type</option>
                {attendanceTypes.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>

              <label>Course Name</label>
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select course</option>
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} – {c.name}
                  </option>
                ))}
              </select>

              <label>Number of Slots</label>
              <input
                type="number"
                placeholder="e.g., 2"
                value={selectedSlots}
                onChange={(e) => setSelectedSlots(e.target.value)}
              />

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

        {/* ---------------- STATE 2: ACTIVE ---------------- */}
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
              <strong>Attendance Marking Completed!</strong>
              <br /><br />
              <p><strong>Course:</strong> {selectedCourse}</p>
              Total Present: {dummyAttendanceList.length} / {selectedSlots}
            </div>

            <div className="final-list">
              <strong>Final Attendance List:</strong>

              <div className="scroll-area">
                {dummyAttendanceList.map((s) => (
                  <div className="student-row" key={s.roll}>
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
