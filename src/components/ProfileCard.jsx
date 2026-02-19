import React from "react";


const ProfileCard = ({ profile }) => {
  // 1️⃣ Read from localStorage

  const storedUser = localStorage.getItem("currentUser");
console.log("ProfileCard storedUser data:", storedUser);
  // 2️⃣ Parse safely
  const user = storedUser ? JSON.parse(storedUser) : null;
  // 3️⃣ Safety check (VERY IMPORTANT)
  if (!profile) {
    return <p>Loading profile...</p>;
  }
     return (
  <div className="profile-container">
      <div className="profile-header"></div>

      <div className="profile-avatar">
        <div className="avatar-icon">👤</div>
      </div>

      <div className="profile-content">
        <h2 className="profile-name">
          <strong>{profile?.name || "John Smith"}</strong>
        </h2>

        <ul className="profile-list">
          <li>Student ID: {profile.studentId}</li>
          <li>Year: {profile.year}</li>
          <li>Section: {profile.section}</li>
          <li>Department: {profile.department}</li>
        </ul>

        <button className="scan-btn">
          Scan QR for Attendance
        </button>
      </div>
    </div>
  );
};
export default ProfileCard;