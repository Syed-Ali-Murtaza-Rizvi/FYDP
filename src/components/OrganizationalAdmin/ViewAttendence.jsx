// src/components/admin/ViewAttendance.jsx
import React, { useState } from "react";
import { Eye } from "lucide-react";
import AddAttendanceModal from "./AddAttendenceModal";


const ViewAttendance = ({ years, batches, programs, courses, records }) => {
  const [subTab, setSubTab] = useState("individual"); // or "coursewise"
  const [roll, setRoll] = useState("");
  const [batch, setBatch] = useState("");
  const [program, setProgram] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [individualResults, setIndividualResults] = useState([]);
  const [individualSearched, setIndividualSearched] = useState(false);
  const [individualMessage, setIndividualMessage] = useState("");

  const courseRecords = records[selectedCourse] || [];

  const handleIndividualSearch = () => {
    const rollQuery = roll.trim().toLowerCase();
    const batchQuery = batch.trim();
    const programQuery = program.trim();

    if (!rollQuery && (!batchQuery || !programQuery)) {
      setIndividualResults([]);
      setIndividualSearched(true);
      setIndividualMessage("Enter a roll number, or select both batch and program.");
      return;
    }

    const flattened = Object.entries(records || {}).flatMap(([courseCode, students]) => {
      const safeStudents = Array.isArray(students) ? students : [];
      const courseName = courses?.find((c) => c.code === courseCode)?.name;
      return safeStudents.map((s) => ({
        ...s,
        courseCode,
        courseName,
      }));
    });

    const filtered = flattened.filter((s) => {
      if (rollQuery) {
        return String(s.roll ?? "").toLowerCase().includes(rollQuery);
      }

      const matchesBatch = String(s.batch ?? "") === batchQuery;
      const matchesProgram = String(s.program ?? "") === programQuery;
      return matchesBatch && matchesProgram;
    });

    setIndividualResults(filtered);
    setIndividualSearched(true);
    setIndividualMessage("");
  };

  return (
    <div className="content-box">
      <div className="section-title">
        <span className="section-title-left">
          <Eye size={20} />
          <span>View Student Attendance</span>
        </span>
      </div>

      <div className="sub-tabs">
       <div className="ind"> <button className={subTab==="individual"?"active":""} onClick={()=>setSubTab("individual")}>Individual Student Search</button></div>
       <div className="course"> <button className={subTab==="coursewise"?"active":""} onClick={()=>setSubTab("coursewise")}>Course-wise Attendance</button></div>
      </div>
      <br />

      {subTab === "individual" && (
        <>
          <div className="filters">
            <input placeholder="Search by roll number" value={roll} onChange={(e)=>setRoll(e.target.value)} />
            <select value={batch} onChange={(e)=>setBatch(e.target.value)}>
              <option value="">All batches</option>
              {batches.map(b=> <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={program} onChange={(e)=>setProgram(e.target.value)}>
              <option value="">All programs</option>
              {programs.map(p=> <option key={p} value={p}>{p}</option>)}
            </select>
            <button type="button" className="primary" onClick={handleIndividualSearch}>Search</button>
          </div>

          {!individualSearched && (
            <div className="placeholder">Enter student details and click Search to view attendance records</div>
          )}

          {individualSearched && individualMessage && (
            <div className="placeholder">{individualMessage}</div>
          )}

          {individualSearched && !individualMessage && individualResults.length === 0 && (
            <div className="placeholder">No attendance records found for the given filters.</div>
          )}

          {individualSearched && individualResults.length > 0 && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th><th>Roll Number</th><th>Name</th><th>Batch</th><th>Program</th><th>Total Classes</th><th>Attended</th><th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {individualResults.map((s, idx) => (
                  <tr key={`${s.courseCode}-${s.roll}-${idx}`}>
                    <td>{s.courseCode}{s.courseName ? ` - ${s.courseName}` : ""}</td>
                    <td>{s.roll}</td>
                    <td>{s.name}</td>
                    <td>{s.batch}</td>
                    <td>{s.program}</td>
                    <td>{s.total}</td>
                    <td>{s.attended}</td>
                    <td>
                      <span className={s.percent >= 85 ? "green-badge" : s.percent >= 75 ? "yellow-badge" : "red-badge"}>
                        {s.percent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {subTab === "coursewise" && (
        <>
          <div className="filters">
            <select value={selectedCourse} onChange={(e)=>setSelectedCourse(e.target.value)}>
              <option value="">Select course</option>
              {courses.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
            </select>
            <button className="primary" onClick={() => { /* no-op demo */ }}>View Attendance</button>
          </div>

          <h4 className="course-heading">Showing attendance for: {selectedCourse ? selectedCourse + " - " + courses.find(x=>x.code===selectedCourse)?.name : "—"}</h4>

          <table className="data-table">
            <thead>
              <tr>
                <th>Roll Number</th><th>Name</th><th>Batch</th><th>Program</th><th>Total Classes</th><th>Attended</th><th>Percentage</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courseRecords.map(s => (
                <tr key={s.roll}>
                  <td>{s.roll}</td>
                  <td>{s.name}</td>
                  <td>{s.batch}</td>
                  <td>{s.program}</td>
                  <td>{s.total}</td>
                  <td>{s.attended}</td>
                  <td><span className={s.percent >= 85 ? "green-badge" : s.percent >= 75 ? "yellow-badge" : "red-badge"}>{s.percent}%</span></td>
                  <td><button className="add-btn" onClick={() => { setSelectedStudent(s); setShowAddModal(true); }}>Add</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showAddModal && selectedStudent && (
        <AddAttendanceModal
          title="Add Attendance"
          studentName={`${selectedStudent.name} (${selectedStudent.roll})`}
          defaultCourse={selectedCourse}
          onClose={() => setShowAddModal(false)}
          onSubmit={(payload) => { console.log("Add attendance:", payload); setShowAddModal(false); alert("Attendance added (demo)."); }}
        />
      )}
    </div>
  );
};

export default ViewAttendance;
