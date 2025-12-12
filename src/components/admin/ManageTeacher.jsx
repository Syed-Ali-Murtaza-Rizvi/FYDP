// src/components/admin/ManageTeachers.jsx
import React, { useState } from "react";

const ManageTeachers = ({ teachers, years, programs, departments, onRegister }) => {
  const [form, setForm] = useState({ name: "", id: "", email: "", phone: "", year: "", program: "", dept: "", courses: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="content-box">
      <div className="section-title"> 👩‍🏫Manage Teachers <span className="badge">{teachers.length} Total Teachers</span></div>

      <div className="card-inner">
        <h4>Register New Teacher</h4>
        <div className="grid-2">
          <input name="name" placeholder="Full Name *" value={form.name} onChange={handle} />
          <input name="id" placeholder="Teacher ID *" value={form.id} onChange={handle} />
          <input name="email" placeholder="Email *" value={form.email} onChange={handle} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handle} />
          <select name="year" value={form.year} onChange={handle}><option>Teaching Year</option>{years.map(y => <option key={y}>{y}</option>)}</select>
          <select name="program" value={form.program} onChange={handle}><option>Program</option>{programs.map(p => <option key={p}>{p}</option>)}</select>
          <select name="dept" value={form.dept} onChange={handle}><option>Department</option>{departments.map(d => <option key={d}>{d}</option>)}</select>
          <input name="courses" placeholder="Courses (comma-separated)" value={form.courses} onChange={handle} />
        </div>
        <br />
        <button className="primary" onClick={() => { if (!form.name || !form.id) { alert("Required fields"); return; } onRegister && onRegister(form); setForm({ name: "", id: "", email: "", phone: "", year: "", program: "", dept: "", courses: "" }); }}>Register Teacher</button>
      </div>

      <div className="card-inner small">
        <h4>Search Teachers</h4>
        <div className="filters-inline">
          <select><option>Year (Optional)</option>{years.map(y => <option key={y}>{y}</option>)}</select>
          <select><option>Program (Optional)</option>{programs.map(p => <option key={p}>{p}</option>)}</select>
          <input placeholder="Enter name or teacher ID" />
          <button className="primary-outline">Search Teachers</button>
        </div>
        <div className="placeholder">Use filters above to search for teachers</div>
      </div>
    </div>
  );
};

export default ManageTeachers;
