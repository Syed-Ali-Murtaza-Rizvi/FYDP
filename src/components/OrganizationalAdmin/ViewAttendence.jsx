// src/components/admin/ViewAttendance.jsx
import React, { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import AddAttendanceModal from "./AddAttendenceModal";


const normalizeCourseCode = (value) => {
  const text = String(value ?? "").trim();
  if (!text) return "";
  return text.split("-")[0].trim().split(" ")[0].trim();
};

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const normalizeRow = (row, courseCode) => {
  const roll = String(
    row?.roll ?? row?.id ?? row?.studentId ?? row?.studentRoll ?? ""
  ).trim();
  const name = String(row?.name ?? row?.studentName ?? "").trim();
  const batch = String(row?.batch ?? row?.year ?? "").trim();
  const program = String(row?.program ?? row?.dept ?? row?.department ?? "").trim();
  const total = toNumber(row?.total ?? row?.totalClasses);
  const attended = toNumber(row?.attended ?? row?.present);
  const computedPercent = total > 0 ? Math.round((attended / total) * 1000) / 10 : 0;
  const percent = Number.isFinite(Number(row?.percent)) ? Number(row?.percent) : computedPercent;

  return {
    ...row,
    courseCode,
    roll,
    name,
    batch,
    program,
    total,
    attended,
    percent,
  };
};

const normalizeRecords = (rawRecords) => {
  if (!rawRecords) return {};

  // Array shape: [{ courseCode, roll, ... }, ...]
  if (Array.isArray(rawRecords)) {
    return rawRecords.reduce((acc, row) => {
      const courseCode = normalizeCourseCode(row?.courseCode ?? row?.course ?? row?.code);
      if (!courseCode) return acc;
      acc[courseCode] ??= [];
      acc[courseCode].push(normalizeRow(row, courseCode));
      return acc;
    }, {});
  }

  // Object shape: { CS301: [...rows] } or { CS301: row }
  if (typeof rawRecords === "object") {
    return Object.entries(rawRecords).reduce((acc, [key, value]) => {
      const courseCode = normalizeCourseCode(key);
      const rows = Array.isArray(value) ? value : value ? [value] : [];
      acc[courseCode] = rows.map((r) => normalizeRow(r, courseCode));
      return acc;
    }, {});
  }

  return {};
};

const ViewAttendance = ({ years, batches, programs, courses, records }) => {
  const [subTab, setSubTab] = useState("individual"); // or "coursewise"
  const [roll, setRoll] = useState("");
  const [batch, setBatch] = useState("");
  const [program, setProgram] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [coursewiseViewed, setCoursewiseViewed] = useState(false);
  const [coursewiseMessage, setCoursewiseMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [individualResults, setIndividualResults] = useState([]);
  const [individualSearched, setIndividualSearched] = useState(false);
  const [individualMessage, setIndividualMessage] = useState("");

  const recordsByCourse = useMemo(() => {
    let fromStorage = null;
    try {
      const stored = localStorage.getItem("studentAttendanceRecords");
      if (stored) fromStorage = JSON.parse(stored);
    } catch {}

    return normalizeRecords(fromStorage ?? records);
  }, [records]);

  const selectedCourseCode = normalizeCourseCode(selectedCourse);
  const courseRecords = recordsByCourse[selectedCourseCode] || [];

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

    const flattened = Object.entries(recordsByCourse || {}).flatMap(([courseCode, students]) => {
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
        return String(s.roll ?? s.id ?? s.studentId ?? "").toLowerCase().includes(rollQuery);
      }

      const matchesBatch = String(s.batch ?? s.year ?? "") === batchQuery;
      const matchesProgram = String(s.program ?? s.dept ?? s.department ?? "") === programQuery;
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
            <div className="table-scroll">
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
            </div>
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
            <button
              className="primary"
              type="button"
              onClick={() => {
                setCoursewiseViewed(true);
                if (!selectedCourseCode) {
                  setCoursewiseMessage("Select a course to view attendance.");
                  return;
                }

                if ((recordsByCourse[selectedCourseCode] || []).length === 0) {
                  setCoursewiseMessage("No attendance records found for this course.");
                  return;
                }

                setCoursewiseMessage("");
              }}
            >
              View Attendance
            </button>
          </div>

          <h4 className="course-heading">Showing attendance for: {selectedCourseCode ? selectedCourseCode + " - " + courses.find(x=>x.code===selectedCourseCode)?.name : "—"}</h4>

          {coursewiseViewed && coursewiseMessage && (
            <div className="placeholder">{coursewiseMessage}</div>
          )}

          {coursewiseViewed && !coursewiseMessage && selectedCourseCode && (
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Roll Number</th><th>Name</th><th>Batch</th><th>Program</th><th>Total Classes</th><th>Attended</th><th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {courseRecords.map((s, idx) => (
                    <tr key={`${s.roll || "row"}-${idx}`}>
                      <td>{s.roll}</td>
                      <td>{s.name}</td>
                      <td>{s.batch}</td>
                      <td>{s.program}</td>
                      <td>{s.total}</td>
                      <td>{s.attended}</td>
                      <td><span className={s.percent >= 85 ? "green-badge" : s.percent >= 75 ? "yellow-badge" : "red-badge"}>{s.percent}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
