import React from "react";


const ProfileCard = () => {
  // 1️⃣ Read from localStorage
  const storedUser = localStorage.getItem("currentUser");

  // 2️⃣ Parse safely
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 3️⃣ Safety check (VERY IMPORTANT)
  if (!user) {
    return <p>Loading profile...</p>;
  }
     return (
   <div className="profile-card">
  <div className="profile-avatar">👤</div>
  <h3>{user?.profile?.name || "Student"}</h3>

  <p><strong>Student ID:</strong> {user.id}</p>
   <p><strong>Email:</strong> {user.email}</p>
  <p><strong>Role:</strong> {user.role}</p>
  <p><strong>Year:</strong> {user.year}</p>
  <p><strong>Section:</strong> {user.section}</p>
  <p><strong>Department:</strong> {user.department}</p>
</div>

     );
};

export default ProfileCard;