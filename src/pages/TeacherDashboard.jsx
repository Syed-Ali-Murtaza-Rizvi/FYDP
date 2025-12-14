import React, { useState } from "react";
import teacherData from "../data/TeacherData";
import "./teacher.css";

const TeacherDashboard = () => {
  // 🔐 AUTH
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  if (!currentUser || currentUser.role !== "teacher") {
    return <h2>Unauthorized</h2>;
  }

  // Find teacher in localStorage or fallback to teacherData array
  const teacher =
    teachers.find(t => t.id === currentUser.id) ||
    teacherData.find(t => t.profile.teacherId === currentUser.id);

  if (!teacher) {
    return <h2>Teacher not found</h2>;
  }

  // Safe destructuring with defaults
  const {
    batches = [],
    programs = [],
    attendanceTypes = [],
    dummyAttendanceList = [],
    profile: teacherProfile = {}
  } = teacher;

  // Handle courses safely: ensure it's always an array of objects
  const teacherCourses = Array.isArray(teacher.courses)
    ? teacher.courses
    : teacherData[0]?.courses || [];

  // Teacher profile (REAL data)
  const profile = {
    name: teacher.name || teacherProfile.name || "N/A",
    teacherId: teacher.id || teacherProfile.teacherId || "N/A",
    department: teacher.dept || teacherProfile.department || "N/A",
    coursesTeaching: Array.isArray(teacher.coursesTeaching)
      ? teacher.coursesTeaching
      : teacherProfile.coursesTeaching || [],
    avatar: teacherProfile.avatar || "👩‍🏫",
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

      {/* ================= PROFILE CARD ================= */}
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

      {/* ================= RIGHT SECTION ================= */}
      <div className="right-section">

        {/* TOP ACTIONS */}
        <div className="top-actions">
          <button className="update-btn" onClick={() => setShowUpdateModal(true)}>
            🔄 Update Attendance Request
          </button>
          <button className="btn" onClick={logout}>Logout</button>
        </div>

        {/* WELCOME */}
        <div className="welcome-banner">
          Welcome back, {profile.name}!
        </div>

        {/* ================= UPDATE ATTENDANCE MODAL ================= */}
        {showUpdateModal && (
          <div className="modal-overlay">
            <div className="modal-box">

              <div className="modal-header">
                <h3>Update Attendance Request</h3>
                <span className="close-btn" onClick={() => setShowUpdateModal(false)}>✖</span>
              </div>

              <div className="modal-content">
                <label>Roll Number</label>
                <input type="text" placeholder="Enter roll number" />

                <label>Batch</label>
                <select>
                  <option>Select batch</option>
                  {batches.map(b => <option key={b}>{b}</option>)}
                </select>

                <label>Program</label>
                <select>
                  <option>Select program</option>
                  {programs.map(p => <option key={p}>{p}</option>)}
                </select>

                <label>Course Name</label>
                <select>
                  <option>Select course</option>
                  {teacherCourses.map(c => (
                    <option key={c.code}>{c.code} – {c.name}</option>
                  ))}
                </select>

                <label>Date</label>
                <input type="date" />

                <label>Number of Slots</label>
                <input type="number" placeholder="e.g., 2" />

                <label>Reason for Update</label>
                <input type="text" placeholder="Reason for update" />
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowUpdateModal(false)}>
                  Cancel
                </button>
                <button className="submit-btn">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STATE 1: FORM ================= */}
        {state === "form" && (
          <div className="card">
            <div className="card-title">Live Attendance Marking System</div>

            <div className="card-content">
              <label>Batch</label>
              <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
                <option value="">Select batch</option>
                {batches.map(b => <option key={b}>{b}</option>)}
              </select>

              <label>Program</label>
              <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)}>
                <option value="">Select program</option>
                {programs.map(p => <option key={p}>{p}</option>)}
              </select>

              <label>Date</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />

              <label>Attendance Type</label>
              <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                <option value="">Select type</option>
                {attendanceTypes.map(a => <option key={a}>{a}</option>)}
              </select>

              <label>Course Name</label>
              <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                <option value="">Select course</option>
                {teacherCourses.map(c => (
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
                onChange={e => setSelectedSlots(e.target.value)}
              />

              <button
                className="start-btn"
                onClick={() => {
                  if (!selectedCourse || !selectedSlots) {
                    alert("Select course and slots");
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

        {/* ================= STATE 2: ACTIVE ================= */}
        {state === "active" && (
          <div className="card active-card">
            <div className="card-title">Live Attendance Marking System</div>

            <div className="active-box">
              <p><strong>🔴 RFID + CV Module Active</strong></p>
              <p><strong>Course:</strong> {selectedCourse}</p>
              <p><strong>Total Slots:</strong> {selectedSlots}</p>
            </div>

            <button className="stop-btn" onClick={() => setState("completed")}>
              ■ Stop Attendance
            </button>
          </div>
        )}

        {/* ================= STATE 3: COMPLETED ================= */}
        {state === "completed" && (
          <div className="card">
            <div className="card-title">Live Attendance Marking System</div>

            <div className="success-box">
              <strong>Attendance Completed!</strong><br /><br />
              <p><strong>Course:</strong> {selectedCourse}</p>
              Total Present: {dummyAttendanceList.length} / {selectedSlots}
            </div>

            <div className="final-list">
              <strong>Final Attendance List:</strong>
              <div className="scroll-area">
                {dummyAttendanceList.map(s => (
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
