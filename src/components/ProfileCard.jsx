import React from "react";
import { User } from "lucide-react";

const ProfileCard = ({ profile, onScanClick }) => {
  // Safety check
  if (!profile) {
    return <p>Loading profile...</p>;
  }
     return (
  <div className="profile-container">
      <div className="profile-header"></div>

      <div className="profile-avatar">
        <div className="avatar-icon"> <User size={50} color="#5A6F8E" strokeWidth={2.5} /></div>
      </div>

      <div className="profile-content">
        <h2 className="profile-name">
          <strong>{profile?.name || "John Smith"}</strong>
        </h2>

        <ul className="profile-list">
          {profile.rollNo ? <li>Roll No: {profile.rollNo}</li> : null}
          {profile.studentId != null ? <li>Student ID: {profile.studentId}</li> : null}
          {profile.email ? <li>Email: {profile.email}</li> : null}
          <li>Year: {profile.year}</li>
          <li>Section: {profile.section}</li>
          <li>Department: {profile.dept || profile.program}</li>
        </ul>

        {typeof onScanClick === "function" && (
          <button className="scan-btn" onClick={onScanClick}>
            Scan QR for Attendance
          </button>
        )}
      </div>
    </div>
  );
};
export default ProfileCard;