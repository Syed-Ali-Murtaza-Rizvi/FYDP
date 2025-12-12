// src/components/admin/AttendanceRequests.jsx
import React, { useState } from "react";
import AddAttendanceModal from "./AddAttendenceModal";

const AttendanceRequests = ({ requests }) => {
  const [selected, setSelected] = useState(null);
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="content-box">
      <div className="section-title">📋 Pending Attendance Update Requests</div>

      <div className="requests-list">
        {requests.map(req => (
          <div className="request-card" key={req.id}>
            <div className="request-left">
              <div><strong>Teacher</strong><br />{req.teacher}</div>
              <div><strong>Student</strong><br />{req.studentName} ({req.studentRoll})</div>
              <div><strong>Batch</strong><br />{req.batch}</div>
              <div><strong>Program</strong><br />{req.program}</div>
              <div><strong>Date</strong><br />{req.date}</div>
              <div><strong>Course</strong><br />{req.course}</div>
              <div><strong>Reason</strong><br /><em>"{req.reason}"</em></div>
            </div>

            <div className="request-actions">
              <button className="review-btn" onClick={() => { setSelected(req); setShowReview(true); }}>Review</button>
            </div>
          </div>
        ))}
      </div>

      {showReview && selected && (
        <AddAttendanceModal
          title="Review Attendance Request"
          studentName={selected.studentName + " (" + selected.studentRoll + ")"}
          defaultCourse={selected.course}
          defaultSlots={selected.slots}
          onClose={() => setShowReview(false)}
          onSubmit={(payload) => {
            // demo: accept/reject locally, in real app call API
            console.log("Reviewed:", payload);
            setShowReview(false);
            alert("Request reviewed (demo).");
          }}
        />
      )}
    </div>
  );
};

export default AttendanceRequests;
