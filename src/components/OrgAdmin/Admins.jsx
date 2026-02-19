import React, { useState } from "react";
import orgAdminData from "../../data/OrgAdminData";

const Admins = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdmins = data.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className="heading1">
        <h3>Admin Management (Multi-Organization)</h3>
        <button className="btn">+ Add Admin</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search admins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Department</th>
            <th>Status</th>
            <th>Join Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.organization}</td>
              <td>{admin.department}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admins;
