import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/admin.css";
const ManageStudents = ({ years, programs, students = [], onRegister }) => {
  const [form, setForm] = useState({
    name: "",
    id: "",
    year: "",
    batch: "",
    program: "",
    email: "",
    phone: ""
  });
  const [filterYear, setFilterYear] = useState("");
const [filterProgram, setFilterProgram] = useState("");
const [filteredStudents, setFilteredStudents] = useState([]);

useEffect(() => {
  setFilteredStudents([]);
}, [filterYear, filterProgram]);
    // 🔹 get students from localStorage
  const localStudents =
    JSON.parse(localStorage.getItem("students")) || [];

  // 🔹 merge JSON students + localStorage students
  const allStudents = [
    ...students,
    ...localStudents.filter(
      ls => !students.some(js => js.id === ls.id)
    )
  ];


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.id) {
      alert("Full Name and Roll Number are required");
      return;
    }

    onRegister({
      ...form,
      password: form.id // default password
    });

    setForm({
      name: "",
      id: "",
      year: "",
      batch: "",
      program: "",
      email: "",
      phone: ""
    });
  };

  return (
    <div className="content-box">

      {/* HEADER */}
      <div className="section-title">
        🧑‍🎓 Manage Students
        <span className="badge">{allStudents.length} Total Students</span>

      </div>

      {/* REGISTER STUDENT */}
      <div className="card-inner">
        <h4>Register New Student</h4>

        <div className="grid-2">
          <input
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="id"
            placeholder="Roll Number *"
            value={form.id}
            onChange={handleChange}
          />

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select
            name="batch"
            value={form.batch}
            onChange={handleChange}
          >
            <option value="">Select batch</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select
            name="program"
            value={form.program}
            onChange={handleChange}
          >
            <option value="">Select program</option>
            {programs.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <br />

        <button className="primary" onClick={handleSubmit}>
          Register Student
        </button>
      </div>

      {/* VIEW STUDENTS */}
      <div className="card-inner small">
        <h4>View Students by Year and Program</h4>

        <div className="filters-inline">
  <select
    value={filterYear}
    onChange={(e) => setFilterYear(e.target.value)}
  >
    <option value="">Select Year</option>
    {years.map(y => (
      <option key={y} value={y}>{y}</option>
    ))}
  </select>

  <select
    value={filterProgram}
    onChange={(e) => setFilterProgram(e.target.value)}
  >
    <option value="">Select Program</option>
    {programs.map(p => (
      <option key={p} value={p}>{p}</option>
    ))}
  </select>

  <button
    className="primary-outline"
    onClick={() => {
      if (!filterYear || !filterProgram) {
        alert("Please select both Year and Program");
        return;
      }

      const result = allStudents.filter(
        s =>
          s.year === filterYear &&
          s.program === filterProgram
      );

      setFilteredStudents(result);
    }}
  >
    View Students
  </button>
</div>


       <div className="placeholder">
  {filteredStudents.length === 0 ? (
    <p>No students found for selected filters.</p>
  ) : (
    <table className="simple-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Year</th>
          <th>Program</th>
          <th>Email</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        {filteredStudents.map((s, index) => (
          <tr key={index}>
            <td>{s.name}</td>
            <td>{s.id}</td>
            <td>{s.year}</td>
            <td>{s.program}</td>
            <td>{s.email || "-"}</td>
            
            <td><div class="modify"><button id="up">update</button>
            <button id="del">del</button></div></td>
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

export default ManageStudents;
