import React, { useState } from "react";
import AddAttendanceModal from "./AddAttendenceModal";
import { getAttendanceRequests } from "../../data/AttendenceRequest";

const AttendanceRequests = ({ requests = [] }) => {
  console.log("🧑‍💼 Admin rendering requests:", requests);

  const [selected, setSelected] = useState(null);
  const [showReview, setShowReview] = useState(false);

  // ✅ EMPTY STATE
  if (requests.length === 0) {
    return (
      <div className="content-box">
        <div className="section-title">
          📋 Pending Attendance Update Requests
        </div>
        <p style={{ padding: "10px", color: "#777" }}>
          No attendance update requests yet.
        </p>
      </div>
    );
  }

  return (
    <div className="content-box">
      <div className="section-title">
        📋 Pending Attendance Update Requests
      </div>

      <div className="requests-list">
        {requests.map(req => (
          <div className="request-card" key={req.id}>
            <div className="request-left">

              <div><strong>Teacher</strong><br />{req.teacherName}</div>
              <div><strong>Teacher ID</strong><br />{req.teacherId}</div>
              <div><strong>Department</strong><br />{req.department}</div>

              <div><strong>Batch</strong><br />{req.batch}</div>
              <div><strong>Program</strong><br />{req.program}</div>

              <div><strong>Course</strong><br />{req.course}</div>
              <div><strong>Attendance Type</strong><br />{req.attendanceType}</div>
              <div><strong>Slots</strong><br />{req.slots}</div>

              <div>
                <strong>Reason</strong><br />
                <em>"{req.reason}"</em>
              </div>

              <div><strong>Status</strong><br />{req.status}</div>

              <div>
                <strong>Requested At</strong><br />
                {req.createdAt
                  ? new Date(req.createdAt).toLocaleString()
                  : "N/A"}
              </div>
            </div>

            <div className="request-actions">
              <button
                className="review-btn"
                onClick={() => {
                  setSelected(req);
                  setShowReview(true);
                }}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REVIEW MODAL */}
      {showReview && selected && (
        <AddAttendanceModal
          title="Review Attendance Request"
          course={selected.course}
          slots={selected.slots}
          onClose={() => setShowReview(false)}
          onSubmit={(payload) => {
            console.log("✅ Admin reviewed request:", payload);
            alert("Request reviewed (demo)");
            setShowReview(false);
          }}
        />
      )}
    </div>
  );
};

export default AttendanceRequests;
