import React from "react";
import orgAdminData from "../../data/OrgAdminData";

const EventAdmins = () => {
  const data = orgAdminData.eventAdmins;

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Event Admin Management</h3>
        <button className="primary-btn">+ Add Event Admin</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Events Managed</th>
            <th>Active Events</th>
            <th>Status</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.organization}</td>
              <td>{admin.eventsManaged}</td>
              <td><span className="active" >{admin.activeEvents}</span></td>
              <td>
                <span
                  className={
                    admin.status === "active"
                      ? "status active"
                      : "status inactive"
                  }
                >
                  {admin.status}
                </span>
              </td>
              <td>{admin.joinDate}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventAdmins;
