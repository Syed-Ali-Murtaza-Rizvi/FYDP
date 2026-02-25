import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminData from "../../data/AdminData";
import AdminHeader from "../../components/OrganizationalAdmin/AdminHeader";
import AttendanceRequests from "../../components/OrganizationalAdmin/AttendenceRequest";
import ManageStudents from "../../components/OrganizationalAdmin/ManageStudents";
import ManageTeachers from "../../components/OrganizationalAdmin/ManageTeacher";
import ViewAttendance from "../../components/OrganizationalAdmin/ViewAttendence";
import "../../styles/admin.css";
import "./OrganizationalAdmin.css";
import { getAttendanceRequests } from "../../data/AttendenceRequest";

const OrganizationalAdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    document.body.classList.add("orgadmin-page");
    return () => {
      document.body.classList.remove("orgadmin-page");
    };
  }, []);

  // ✅ AUTHENTICATION (SAME STYLE AS STUDENT)
  const currentUserStr = localStorage.getItem("currentUser");
  let adminProfile = null;

  if (currentUserStr) {
    try {
      const currentUser = JSON.parse(currentUserStr);
      if (
        currentUser.role === "orgadmin" &&
        currentUser.email === adminData.profile.email
      ) {
        adminProfile = adminData.profile;
      }
    } catch {}
  }

  // ❌ Not admin → kick out
  useEffect(() => {
    if (!adminProfile) navigate("/login");
  }, [adminProfile, navigate]);

  // ✅ Load requests dynamically
  useEffect(() => {
    const stored = getAttendanceRequests();

    // If nothing is stored yet, seed from AdminData (demo data)
    if (
      (!stored || stored.length === 0) &&
      Array.isArray(adminData.attendanceRequests) &&
      adminData.attendanceRequests.length > 0
    ) {
      const seeded = adminData.attendanceRequests.map((req, index) => ({
        id: req.id ?? `seed-${index}`,
        teacherId: req.teacherId ?? "N/A",
        teacherName: req.teacherName ?? req.teacher ?? "N/A",
        department: req.department ?? adminData.profile?.department ?? "N/A",
        batch: req.batch ?? "N/A",
        program: req.program ?? "N/A",
        course: req.course ?? "N/A",
        attendanceType: req.attendanceType ?? "N/A",
        slots: req.slots ?? 0,
        reason: req.reason ?? "",
        status: req.status ?? "Pending",
        createdAt: req.createdAt ?? req.date ?? new Date().toISOString(),
      }));

      try {
        localStorage.setItem("attendanceRequests", JSON.stringify(seeded));
      } catch (e) {}

      setRequests(seeded);
      return;
    }

    setRequests(stored);
  }, [tab]);

  /* ---------------- REGISTER STUDENT ---------------- */
  const handleRegisterStudent = (student) => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];

    const exists = stored.find(s => s.id === student.id);
    if (exists) {
      alert("Student already exists");
      return;
    }

    const newStudent = {
      ...student,
      password: student.id
    };

    stored.push(newStudent);
    localStorage.setItem("students", JSON.stringify(stored));

    alert(
      `Student Registered!\n\nLogin:\nID: ${newStudent.id}\nPassword: ${newStudent.password}`
    );
  };

  /* ---------------- REGISTER TEACHER ---------------- */
  const handleRegisterTeacher = (teacher) => {
    let storedTeachers = [];

    try {
      storedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    } catch {
      storedTeachers = [];
    }

    if (!Array.isArray(storedTeachers)) storedTeachers = [];

    const exists = storedTeachers.find(t => t.id === teacher.id);
    if (exists) {
      alert("Teacher ID already exists");
      return;
    }

    const newTeacher = {
      ...teacher,
      password: teacher.id,
      dept: adminProfile.department // ✅ same department as admin
    };

    storedTeachers.push(newTeacher);
    localStorage.setItem("teachers", JSON.stringify(storedTeachers));

    alert(
      `Teacher registered!\n\nLogin:\nID: ${newTeacher.id}\nPassword: ${newTeacher.password}`
    );
  };

  return (
    <div className="admin-page">
      <AdminHeader tab={tab} setTab={setTab} />

      {tab === "requests" && (
        <AttendanceRequests requests={requests} />
      )}

      {tab === "students" && (
        <ManageStudents
          students={adminData.students}
          years={adminData.years}
          programs={adminData.programs}
          onRegister={handleRegisterStudent}
        />
      )}

      {tab === "teachers" && (
        <ManageTeachers
          teachers={adminData.teachers}
          years={adminData.years}
          programs={adminData.programs}
          departments={adminData.departments}
          onRegister={handleRegisterTeacher}
        />
      )}

      {tab === "view" && (
        <ViewAttendance
          years={adminData.years}
          batches={adminData.batches}
          programs={adminData.programs}
          courses={adminData.courses}
          records={adminData.studentAttendanceRecords}
        />
      )}
    </div>
  );
};

export default OrganizationalAdminDashboard;
