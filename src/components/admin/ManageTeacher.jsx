import React, { useState } from "react";
import "../../styles/admin.css";

const ManageTeachers = ({
  teachers = [],
  years = [],
  programs = [],
  departments = [],
  onRegister
}) => {

  /* ======================
     REGISTER FORM STATE
  ====================== */
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    year: "",
    program: "",
    dept: "",
    courses: ""
  });

  /* ======================
     FILTER STATE
  ====================== */
  const [filterYear, setFilterYear] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  /* ======================
     MERGE JSON + LOCAL
  ====================== */
  const localTeachers =
    JSON.parse(localStorage.getItem("teachers")) || [];

  const allTeachers = [
    ...teachers,
    ...localTeachers.filter(
      lt => !teachers.some(jt => jt.id === lt.id)
    )
  ];

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!form.name || !form.id) {
      alert("Teacher ID and Name are required");
      return;
    }

    onRegister(form);

    setForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      year: "",
      program: "",
      dept: "",
      courses: ""
    });
  };

  const handleSearch = () => {
    if (!filterYear || !filterProgram) {
      alert("Please select both Year and Program");
      return;
    }

    const result = allTeachers.filter(
      t =>
        t.year === filterYear &&
        t.program === filterProgram
    );

    setFilteredTeachers(result);
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="content-box">

      {/* HEADER */}
      <div className="section-title">
        👩‍🏫 Manage Teachers
        <span className="badge">{allTeachers.length} Total Teachers</span>
      </div>

      {/* REGISTER TEACHER */}
      <div className="card-inner">
        <h4>Register New Teacher</h4>

        <div className="grid-2">
          <input
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="id"
            placeholder="Teacher ID *"
            value={form.id}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select name="year" value={form.year} onChange={handleChange}>
            <option value="">Teaching Year</option>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>

          <select name="program" value={form.program} onChange={handleChange}>
            <option value="">Program</option>
            {programs.map(p => <option key={p}>{p}</option>)}
          </select>

          <select name="dept" value={form.dept} onChange={handleChange}>
            <option value="">Department</option>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>

          <input
            name="courses"
            placeholder="Courses (comma-separated)"
            value={form.courses}
            onChange={handleChange}
          />
        </div>

        <br />
        <button className="primary" onClick={handleRegister}>
          Register Teacher
        </button>
      </div>

      {/* SEARCH TEACHERS */}
      <div className="card-inner small">
        <h4>Search Teachers</h4>

        <div className="filters-inline">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>

          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
          >
            <option value="">Select Program</option>
            {programs.map(p => <option key={p}>{p}</option>)}
          </select>

          <button className="primary-outline" onClick={handleSearch}>
            Search Teachers
          </button>
        </div>

        {/* RESULTS */}
        <div className="placeholder">
          {filteredTeachers.length === 0 ? (
            <p>No teachers found for selected filters.</p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Teacher ID</th>
                  <th>Year</th>
                  <th>Program</th>
                  <th>Department</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((t, index) => (
                  <tr key={index}>
                    <td>{t.name}</td>
                    <td>{t.id}</td>
                    <td>{t.year}</td>
                    <td>{t.program}</td>
                    <td>{t.dept || "-"}</td>
                    <td>{t.email || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};

export default ManageTeachers;
