import React, { useState } from "react";
import orgAdminData from "../../data/OrgAdminData";

const EventAdmins = () => {
  const initialData = orgAdminData.eventAdmins;

  const [eventAdmins, setEventAdmins] = useState(initialData);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = () => {
    if (!formData.name || !formData.email) return;

    const newAdmin = {
      id: Date.now(),
      ...formData,
      eventsManaged: 0,
      activeEvents: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    };

    setEventAdmins([newAdmin, ...eventAdmins]);
    setShowModal(false);

    setFormData({
      name: "",
      email: "",
      organization: "",
    });
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Event Admin Management</h3>
        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Event Admin
        </button>
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
          {eventAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.organization}</td>
              <td>{admin.eventsManaged}</td>
              <td>
                <span className="active">{admin.activeEvents}</span>
              </td>
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Event Admin</h2>
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
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-create"
                onClick={handleCreateAdmin}
              >
                Create Event Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAdmins;