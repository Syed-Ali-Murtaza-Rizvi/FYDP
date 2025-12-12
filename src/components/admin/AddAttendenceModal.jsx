// src/components/admin/AddAttendanceModal.jsx
import React, { useState } from "react";

const AddAttendanceModal = ({ title="Add Attendance", studentName="", defaultCourse="", defaultSlots=1, onClose, onSubmit }) => {
  const [course, setCourse] = useState(defaultCourse || "");
  const [slots, setSlots] = useState(defaultSlots || 1);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <span className="close-btn" onClick={() => onClose && onClose()}>✖</span>
        </div>

        <p className="modal-sub">Add attendance for {studentName}</p>

        <label>Course *</label>
        <input value={course} onChange={(e)=>setCourse(e.target.value)} placeholder="Select course (demo)" />

        <label>Number of Slots *</label>
        <input type="number" value={slots} onChange={(e)=>setSlots(e.target.value)} min={1} max={4} />

        <small>Maximum 2 slots allowed (demo)</small>
        <br /><br />
        <button className="primary" onClick={() => {
          if (!course || !slots) { alert("Please fill required fields"); return; }
          onSubmit && onSubmit({ course, slots });
        }}>Add Attendance</button>
      </div>
    </div>
  );
};

export default AddAttendanceModal;
