import React, { useState } from "react";

const Admins = ({ data = [] }) => {
  const [admins, setAdmins] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    department: "",
    status: "active",
  });

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = () => {
    if (!formData.name || !formData.email) return;

    const newAdmin = {
      id: Date.now(),
      ...formData,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setAdmins([newAdmin, ...admins]);
    setShowModal(false);

    setFormData({
      name: "",
      email: "",
      organization: "",
      department: "",
      status: "active",
    });
  };

  return (
    <div className="table-container">
      <div className="heading1">
        <h3>Admin Management (Multi-Organization)</h3>
        <button className="btn" onClick={() => setShowModal(true)}>
          + Add Admin
        </button>
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Admin</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-grid">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
              />
              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-create" onClick={handleCreateAdmin}>
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;