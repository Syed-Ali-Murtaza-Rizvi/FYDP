import React from "react";

const ProfileCard=({profile})=>{
     return (
   <div className="profile-card">
  <div className="profile-avatar">👤</div>
  <h3>{profile.name}</h3>

  <p><strong>Student ID:</strong> {profile.studentId}</p>
  <p><strong>Year:</strong> {profile.year}</p>
  <p><strong>Section:</strong> {profile.section}</p>
  <p><strong>Department:</strong> {profile.department}</p>
</div>

     );
};

export default ProfileCard;