import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import axios from "../../utils/axiosInstance";
import "../../styles/admin.css";

const ManageTeachers = ({ programs = [], years = [] }) => {
  /* ======================
     ADMIN CONTEXT
  ====================== */
  const admin = JSON.parse(localStorage.getItem("currentUser")) || {};

  // ✅ Only programs admin controls
  const adminPrograms =
    Array.isArray(admin.programs) && admin.programs.length
      ? admin.programs
      : programs;

  /* ======================
     HELPERS
  ====================== */
  const parseCommaList = (value) => {
    if (typeof value !== "string") return [];
    return value.split(",").map(v => v.trim()).filter(Boolean);
  };

  const parseCourses = (value) => {
    if (typeof value !== "string") return [];
    return value
      .split(",")
      .map(c => {
        const [code, name] = c.split(":").map(s => s.trim());
        return { code, name: name || "" };
      })
      .filter(c => c.code);
  };

  const normalizeTeacher = (t) => {
    if (!t || typeof t !== "object") return null;

    // Seed format from TeacherData.js
    if (t.profile && typeof t.profile === "object") {
      const teacherId = t.profile.teacherId ?? "";
      const teacherName = t.profile.name ?? "";
      const teacherDepartment = t.profile.department ?? t.department ?? t.dept ?? "N/A";
      const teacherYears = Array.isArray(t.years)
        ? t.years
        : Array.isArray(t.batches)
          ? t.batches
          : [];
      const teacherPrograms = Array.isArray(t.programs) ? t.programs : [];
      const teacherCourses = Array.isArray(t.courses)
        ? t.courses
        : Array.isArray(t.profile.coursesTeaching)
          ? t.profile.coursesTeaching.map(code => ({ code, name: "" }))
          : [];

      return {
        id: teacherId,
        name: teacherName,
        email: t.profile.email ?? t.email ?? "",
        phone: t.profile.phone ?? t.phone ?? "",
        years: teacherYears,
        programs: teacherPrograms,
        department: teacherDepartment,
        courses: teacherCourses,
        password: t.profile.password ?? t.password,
      };
    }

    // Flat format used by ManageTeachers register UI (or legacy login code)
    const normalizedYears = Array.isArray(t.years)
      ? t.years
      : Array.isArray(t.batches)
        ? t.batches
        : parseCommaList(t.years);
    const normalizedPrograms = Array.isArray(t.programs)
      ? t.programs
      : parseCommaList(t.programs);
    const normalizedCourses = Array.isArray(t.courses)
      ? t.courses
      : typeof t.courses === "string"
        ? t.courses
            .split(",")
            .map(code => ({ code: code.trim(), name: "" }))
            .filter(c => c.code)
        : [];

    return {
      id: t.id ?? t.teacherId ?? "",
      name: t.name ?? "",
      email: t.email ?? "",
      phone: t.phone ?? "",
      years: normalizedYears,
      programs: normalizedPrograms,
      department: t.department ?? t.dept ?? "N/A",
      courses: normalizedCourses,
      password: t.password,
    };
  };

  /* ======================
     LOCAL STORAGE
  ====================== */
  const getTeachers = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem("teachers"));
      const list = Array.isArray(parsed) ? parsed : [];
      return list.map(normalizeTeacher).filter(Boolean);
    } catch {
      return [];
    }
  };

  const [teachers, setTeachers] = useState(getTeachers());

  /* ======================
     REGISTER FORM
  ====================== */
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    years: "",
    programs: "",
    courses: ""
  });

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  /* ======================
     FILTER STATE
  ====================== */
  const [filterYear, setFilterYear] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState("");

  /* ======================
     UPDATE MODAL
  ====================== */
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    id: "",
    courses: ""
  });

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ======================
     REGISTER TEACHER
  ====================== */
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setRegisterError("Name, Email, and Password are required");
      return;
    }

    setRegisterLoading(true);
    setRegisterError("");

    try {
      const payload = {
        role: "teacher",
        name: form.name,
        email: form.email,
        password: form.password,
        ...(form.id && { id: form.id }),
        ...(form.phone && { phone: form.phone }),
        ...(form.years && { years: form.years }),
        ...(form.programs && { programs: form.programs }),
        ...(form.courses && { courses: form.courses }),
      };

      const { data } = await axios.post("/api/signup", payload);

      alert(`Teacher "${data.name}" registered successfully!`);
      setForm({ id: "", name: "", email: "", password: "", phone: "", years: "", programs: "", courses: "" });
    } catch (err) {
      console.error("Teacher registration error:", err.response?.data || err.message);
      const errData = err.response?.data;
      const msg = errData?.message || errData?.detail || errData?.email?.[0] || errData?.name?.[0] || JSON.stringify(errData) || "Registration failed. Please try again.";
      setRegisterError(msg);
    } finally {
      setRegisterLoading(false);
    }
  };

  /* ======================
     SEARCH
  ====================== */
  const handleSearch = async () => {
    if (!filterYear && !filterProgram) {
      setFilterError("Please select at least Year or Program");
      return;
    }

    setFilterLoading(true);
    setFilterError("");
    setFilteredTeachers([]);

    try {
      const params = new URLSearchParams();
      if (filterYear) params.append("years", filterYear);
      if (filterProgram) params.append("programs", filterProgram);

      const { data } = await axios.get(`/api/teachers/?${params.toString()}`);
      console.log("Teachers API raw response:", JSON.stringify(data, null, 2));

      const list = Array.isArray(data) ? data : (data.results ?? []);
      console.log("First teacher object:", list[0]);
      setFilteredTeachers(list);
      if (list.length === 0) setFilterError("No teachers found for selected filters.");
    } catch (err) {
      setFilterError(err.response?.data?.message || "Failed to fetch teachers.");
    } finally {
      setFilterLoading(false);
    }
  };

  /* ======================
     DELETE
  ====================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await axios.delete(`/api/teachers/${id}/`);
      setFilteredTeachers(prev => prev.filter(t => (t.teacher_id || t.id || t.teacherId) !== id));
      setTeachers(prev => prev.filter(t => (t.teacher_id || t.id || t.teacherId) !== id));
      alert("Teacher deleted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete teacher.");
    }
  };

  /* ======================
     UPDATE COURSES
  ====================== */
  const handleUpdateSubmit = () => {
    const updated = teachers.map(t =>
      t.id === updateForm.id
        ? { ...t, courses: parseCourses(updateForm.courses) }
        : t
    );

    localStorage.setItem("teachers", JSON.stringify(updated));
    setTeachers(updated);
    setShowUpdateModal(false);

    console.log(
      "Updated Teacher:",
      updated.find(t => t.id === updateForm.id)
    );
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="content-box">

      <div className="section-title">
        <span className="section-title-left">
          <BookOpen size={20} />
          <span>Manage Teachers</span>
        </span>
        <span className="badge">{teachers.length} Total</span>
      </div>

      {/* REGISTER */}
      <div className="card-inner">
        <h4>Register New Teacher</h4>

        <div className="grid-2">
          <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email *" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password *" value={form.password} onChange={handleChange} />
          <input name="id" placeholder="Teacher ID" value={form.id} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

          <input
            name="years"
            placeholder="Years (e.g. 1,2,3)"
            value={form.years}
            onChange={handleChange}
          />

          <input
            name="programs"
            placeholder="Programs (e.g. CS,SE)"
            value={form.programs}
            onChange={handleChange}
          />

          <input
            name="courses"
            placeholder="Courses (CS301: Database, ...)"
            value={form.courses}
            onChange={handleChange}
          />
        </div>

        {registerError && <p style={{ color: "red", marginBottom: "8px" }}>{registerError}</p>}
        <button className="primary" onClick={handleRegister} disabled={registerLoading}>
          {registerLoading ? "Registering..." : "Register Teacher"}
        </button>
      </div>

      {/* SEARCH */}
      <div className="card-inner small">
        <h4 className="heading-bold">Search Teachers</h4>

        <div className="filters-inline">
          <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">Select Year</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          {/* ✅ ADMIN PROGRAMS ONLY */}
          <select value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
            <option value="">Select Program</option>
            {adminPrograms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <button className="primary-outline" onClick={handleSearch} disabled={filterLoading}>
            {filterLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {filterError && <p style={{ color: "red", margin: "8px 0" }}>{filterError}</p>}

        {/* RESULTS */}
        <div className="placeholder">
          {filteredTeachers.length === 0 ? (
            !filterError && <p>Use the filters above to search teachers.</p>
          ) : (
            <table className="simple-table teacher-search-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Years</th>
                  <th>Programs</th>
                  <th>Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((t, idx) => {
                  const tid = t.teacher_id || t.id || t.teacherId || idx;
                  const tname = t.name || t.full_name || t.teacher_name || "-";
                  const tIdDisplay = t.teacher_id || t.id || t.teacherId || "-";
                  const tYears = Array.isArray(t.years) ? t.years.join(", ") : (Array.isArray(t.batches) ? t.batches.join(", ") : (t.years || t.year || "-"));
                  const tPrograms = Array.isArray(t.programs) ? t.programs.join(", ") : (t.programs || t.program || "-");
                  const tCoursesDisplay = Array.isArray(t.courses)
                    ? t.courses.map(c => typeof c === "string" ? c : (c.course_code || c.code || "")).join(", ")
                    : (t.courses || "-");
                  const tCoursesForEdit = Array.isArray(t.courses)
                    ? t.courses.map(c => typeof c === "string" ? c : `${c.course_code || c.code || ""}: ${c.course_name || c.name || ""}`).join(", ")
                    : (t.courses || "");
                  return (
                  <tr key={tid}>
                    <td>{tname}</td>
                    <td>{tIdDisplay}</td>
                    <td>{tYears}</td>
                    <td>{tPrograms}</td>
                    <td>{tCoursesDisplay}</td>
                    <td>
                      <div className="modify">
                        <button
                          className="update-btn"
                          onClick={() => {
                            setUpdateForm({ id: tid, courses: tCoursesForEdit });
                            setShowUpdateModal(true);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="del-btn"
                          onClick={() => handleDelete(tid)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* UPDATE MODAL */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Courses</h3>
            <input
              value={updateForm.courses}
              onChange={e =>
                setUpdateForm({ ...updateForm, courses: e.target.value })
              }
              placeholder="CODE: Name, ..."
            />
            <div className="modal-actions">
              <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
              <button onClick={handleUpdateSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageTeachers;
