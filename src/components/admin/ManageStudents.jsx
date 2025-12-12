// src/components/admin/ManageStudents.jsx
import React, { useState } from "react";

const ManageStudents = ({ students, years, programs, onRegister }) => {
  const [form, setForm] = useState({
    name: "", roll: "", year: "", batch: "", program: "", email: "", phone: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="content-box">
      <div className="section-title">🧑‍🎓 Manage Students <span className="badge">{students.length} Total Students</span></div>

      <div className="card-inner">
        <h4>Register New Student</h4>
        <div className="grid-2">
          <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} />
          <input name="roll" placeholder="Roll Number *" value={form.roll} onChange={handleChange} />
          <select name="year" value={form.year} onChange={handleChange}><option value="">Select year</option>{years.map(y => <option key={y}>{y}</option>)}</select>
          <select name="batch" value={form.batch} onChange={handleChange}><option value="">Select batch</option>{years.map(y => <option key={y}>{y}</option>)}</select>
          <select name="program" value={form.program} onChange={handleChange}><option value="">Select program</option>{programs.map(p => <option key={p}>{p}</option>)}</select>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        </div>
        <br />
        <button className="primary" onClick={() => {
          if (!form.name || !form.roll) { alert("Fill required fields"); return; }
          onRegister && onRegister(form);
          setForm({ name: "", roll: "", year: "", batch: "", program: "", email: "", phone: "" });
        }}>Register Student</button>
      </div>

      <div className="card-inner small">
        <h4>View Students by Year and Program</h4>
        <div className="filters-inline">
          <select><option>Year</option>{years.map(y=> <option key={y}>{y}</option>)}</select>
          <select><option>Program</option>{programs.map(p=> <option key={p}>{p}</option>)}</select>
          <button className="primary-outline">View Students</button>
        </div>
        <div className="placeholder">Select Year and Program to view students</div>
      </div>
    </div>
  );
};

export default ManageStudents;
