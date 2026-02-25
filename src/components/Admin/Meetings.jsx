import React from "react";
import orgAdminData from "../../data/OrgAdminData";

const Meetings = () => {
  const meetings = orgAdminData.meetings;

  return (
    <div className="table-container">
         <div className="table-header">
      <h3>Meeting Requests</h3></div>
<table>

        <thead>
          <tr>
            <th>Requester</th>
            <th>Role</th>
            <th>Organization</th>
            <th>Department</th>
            <th>Purpose</th>
            <th>Preferred Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.requester}</td>
              <td>{meeting.role}</td>
              <td>{meeting.organization}</td>
              <td>{meeting.department}</td>
              <td>{meeting.purpose}</td>
              <td>{meeting.date}</td>
              <td>{meeting.time}</td>
            <td>
  <span className={`status ${meeting.status}`}>
    {meeting.status}
  </span>
</td>

              <td>
                <button>Update</button>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Meetings;
