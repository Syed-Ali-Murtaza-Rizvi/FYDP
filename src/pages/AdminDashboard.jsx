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
    setData(prev => ({ ...prev, students: [student, ...prev.students] }));
    alert("Student registered (demo).");
  };

  const handleRegisterTeacher = (teacher) => {
    setData(prev => ({ ...prev, teachers: [teacher, ...prev.teachers] }));
    alert("Teacher registered (demo).");
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
