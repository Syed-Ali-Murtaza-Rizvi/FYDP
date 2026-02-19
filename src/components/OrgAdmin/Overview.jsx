import React from "react";
import orgAdminData from "../../data/OrgAdminData";

const Overview = () => {
  const data = orgAdminData.overview;

  return (
    <div className="overview-grid">
      <div className="card">Total Admins: {data.totalAdmins}</div>
      <div className="card">Event Admins: {data.eventAdmins}</div>
      <div className="card">Participants: {data.participants}</div>
      <div className="card">Students: {data.students}</div>
      <div className="card">Teachers: {data.teachers}</div>
      <div className="card">Pending Meetings: {data.pendingMeetings}</div>
    </div>
  );
};

export default Overview;
