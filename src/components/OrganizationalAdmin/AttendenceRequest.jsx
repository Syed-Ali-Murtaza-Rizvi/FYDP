// src/components/admin/AttendanceRequests.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { ClipboardList } from "lucide-react";
import AddAttendanceModal from "./AddAttendenceModal";

const AttendanceRequests = ({ requests = [], onRefresh }) => {
  const [selected, setSelected] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleDecision = async (id, action) => {
    setActionLoading(true);
    try {
      await axios.post(
        `/api/update-attendance-requests/${id}/${action}/`,
        {}
      );
      setShowReview(false);
      setSelected(null);
      onRefresh?.();
    } catch (err) {
      alert(`Failed to ${action} request. Please try again.`);
    } finally {
      setActionLoading(false);
    }
  };

  if (!requests.length) {
    return (
      <div className="content-box">
        <div className="section-title">
          <span className="section-title-left">Pending Attendance Update Requests</span>
        </div>
        <p style={{ padding: "10px", color: "#777" }}>No attendance update requests yet.</p>
      </div>
    );
  }

  return (
    <div className="content-box">
      <div className="section-title">
        <span className="section-title-left">
          <ClipboardList size={22} />
          <span>Pending Attendance Update Requests</span>
        </span>
      </div>

      <div className="requests-list">
        {requests.map(req => (
          <div className="request-card" key={req.id}>
            <div className="request-left">
              <div><strong>Teacher</strong><br />{req.teacher_name ?? req.teacherName ?? "N/A"}</div>
              <div><strong>Teacher ID</strong><br />{req.teacher ?? req.teacherId ?? "N/A"}</div>
              <div><strong>Department</strong><br />{req.department ?? "N/A"}</div>
              <div><strong>Batch</strong><br />{req.batch ?? "N/A"}</div>
              <div><strong>Program</strong><br />{req.program ?? "N/A"}</div>
              <div><strong>Course</strong><br />{req.course_name ?? req.course ?? "N/A"}</div>
              <div><strong>Attendance Type</strong><br />{req.attendance_type ?? req.attendanceType ?? "N/A"}</div>
              <div><strong>Slots</strong><br />{req.slots ?? "N/A"}</div>
              <div><strong>Reason</strong><br /><em>"{req.reason ?? ""}"</em></div>
              <div><strong>Status</strong><br />{req.status ?? "N/A"}</div>
              <div><strong>Requested At</strong><br />{req.created_at ?? req.createdAt ? new Date(req.created_at ?? req.createdAt).toLocaleString() : "N/A"}</div>
            </div>

            <div className="request-actions">
              <button
                className="review-btn"
                onClick={() => { setSelected(req); setShowReview(true); }}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {showReview && selected && (
        <AddAttendanceModal
          title={selected.course_name ?? selected.course}
          request={{
            teacherName: selected.teacher_name ?? selected.teacherName ?? "N/A",
            teacherId: selected.teacher ?? selected.teacherId ?? "N/A",
            department: selected.department ?? "N/A",
            batch: selected.batch ?? "N/A",
            program: selected.program ?? "N/A",
            course: selected.course_name ?? selected.course ?? "N/A",
            attendanceType: selected.attendance_type ?? selected.attendanceType ?? "N/A",
            slots: selected.slots ?? "N/A",
            reason: selected.reason ?? "",
          }}
          onClose={() => { setShowReview(false); setSelected(null); }}
          onAccept={() => handleDecision(selected.id, "approve")}
          onReject={() => handleDecision(selected.id, "reject")}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default AttendanceRequests;
