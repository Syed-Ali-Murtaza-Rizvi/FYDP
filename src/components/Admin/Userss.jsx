import React from "react";
import orgAdminData from "../../data/OrgAdminData";

const Users = () => {
  const users = orgAdminData.users;

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Current Users</h3>
        <button className="primary-btn">+ Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Organization</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.organization}</td>
              <td>{user.department}</td>

              {/* STATUS BADGE */}
              <td>
                <span
                  className={
                    user.status === "online"
                      ? "status online"
                      : "status offline"
                  }
                >
                  {user.status}
                </span>
              </td>

              {/* ACTION BUTTONS */}
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

export default Users;
