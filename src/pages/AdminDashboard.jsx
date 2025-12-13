// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import adminData from "../data/AdminData";
import AdminHeader from "../components/admin/AdminHeader";
import AttendanceRequests from "../components/admin/AttendenceRequest";
import ManageStudents from "../components/admin/ManageStudents";
import ManageTeachers from "../components/admin/ManageTeacher";
import ViewAttendance from "../components/admin/ViewAttendence";

import "../styles/admin.css";

const AdminDashboard = () => {
  const [tab, setTab] = useState("requests"); // default to Attendance Requests
  const [data, setData] = useState(adminData);

 
const handleRegisterStudent = (student) => {
  const stored = JSON.parse(localStorage.getItem("students")) || [];

  const exists = stored.find(s => s.id === student.id);
  if (exists) {
    alert("Student already exists");
    return;
  }

  const newStudent = {
    ...student,
    password: student.id // default password
  };

  stored.push(newStudent);
  localStorage.setItem("students", JSON.stringify(stored));

  alert(
    `Student Registered!\n\nLogin:\nID: ${newStudent.id}\nPassword: ${newStudent.password}`
  );
};


const handleRegisterTeacher = (teacher) => {
  console.log("Registering teacher:", teacher);

  let storedTeachers = [];

  try {
    const raw = localStorage.getItem("teachers");
    storedTeachers = raw ? JSON.parse(raw) : [];
  } catch (e) {
    storedTeachers = [];
  }

  // ✅ FORCE array
  if (!Array.isArray(storedTeachers)) {
    storedTeachers = [];
  }

  const exists = storedTeachers.find(t => t.id === teacher.id);
  if (exists) {
    alert("Teacher ID already exists");
    return;
  }

  const newTeacher = {
    ...teacher,
    password: teacher.id // default password
  };

  storedTeachers.push(newTeacher);
  localStorage.setItem("teachers", JSON.stringify(storedTeachers));

  alert(
    `Teacher registered!\n\nLogin Details:\nID: ${newTeacher.id}\nPassword: ${newTeacher.password}`
  );
};
return (
    <div className="admin-page">
      <AdminHeader tab={tab} setTab={setTab} />

      {tab === "requests" && <AttendanceRequests requests={data.attendanceRequests} />}

      {tab === "students" && (
        <ManageStudents
          students={data.students}
          years={data.years}
          programs={data.programs}
          onRegister={handleRegisterStudent}
        />
      )}

      {tab === "teachers" && (
        <ManageTeachers
          teachers={data.teachers}
          years={data.years}
          programs={data.programs}
          departments={data.departments}
          onRegister={handleRegisterTeacher}
        />
      )}

      {tab === "view" && (
        <ViewAttendance
          years={data.years}
          batches={data.batches}
          programs={data.programs}
          courses={data.courses}
          records={data.studentAttendanceRecords}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
