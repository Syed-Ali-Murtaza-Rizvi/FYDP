import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import SemesterPerformance from "../components/SemesterPerformance";
import CourseTable from "../components/CourseTable";
import students from "../data/StudentData";
import "./student.css";
import { Html5Qrcode } from "html5-qrcode";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [attendanceJSON, setAttendanceJSON] = useState(null);
  const html5QrCodeRef = useRef(null);

  const currentUserStr = localStorage.getItem("currentUser");
  let profile = null, overallAttendance = null, courses = [];
  if (currentUserStr) {
    try {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser && currentUser.role === "student") {
        const student = students.find(
          (s) => s.profile.studentId === currentUser.studentId || s.email === currentUser.email
        );
        if (student) {
          profile = student.profile;
          overallAttendance = student.overallAttendance;
          courses = student.courses;
        }
      }
    } catch {}
  }

  useEffect(() => {
    if (!profile) navigate("/login");
  }, [profile, navigate]);

  const handleLogout = () => navigate("/login");

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        const state = await html5QrCodeRef.current.getState();
        if (state === "SCANNING") await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
      } catch {}
      html5QrCodeRef.current = null;
    }
    setScannerOpen(false);
  };

  const startScanner = () => setScannerOpen(true);

  // Wait for the QR div to exist before starting scanner
  useEffect(() => {
    if (scannerOpen) {
      const qrRegionId = "qr-reader";
      const startQr = async () => {
        // Ensure div exists
        const qrDiv = document.getElementById(qrRegionId);
        if (!qrDiv) return;

        html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

        try {
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length) {
            await html5QrCodeRef.current.start(
              { facingMode: "environment" },
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                try {
                  const qrData = JSON.parse(decodedText);
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const attendanceData = {
                        studentRollNo: profile.studentId,
                        course: qrData.course,
                        slot: qrData.slot,
                        date: qrData.date,
                        scannedAt: new Date().toISOString(),
                        geoLocation: {
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude,
                          accuracy: position.coords.accuracy,
                        },
                      };
                      setAttendanceJSON(attendanceData);
                      stopScanner();
                    },
                    () => {
                      alert("Geolocation permission denied.");
                      stopScanner();
                    }
                  );
                } catch {
                  alert("Invalid QR code format.");
                  stopScanner();
                }
              }
            );
          } else {
            alert("No camera devices found.");
            stopScanner();
          }
        } catch (err) {
          console.error(err);
          alert("Camera access failed.");
          stopScanner();
        }
      };
      startQr();
    }
  }, [scannerOpen, profile]);

  useEffect(() => {
    return () => stopScanner();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">
        <ProfileCard profile={profile} />
        <div className="right-content">
          <div className="heading">
            <h1>Welcome back, {profile?.name || "Student"}!</h1>
            <div className="heading-buttons">
              <button onClick={startScanner} className="mark-attendance-btn">Mark Attendance</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          {scannerOpen && (
            <div className="qr-scanner-container">
              <h3>Scan QR Code</h3>
              <div id="qr-reader"></div>
            </div>
          )}

          {attendanceJSON && (
            <div className="card" style={{ marginTop: "20px" }}>
              <div className="card-title">Attendance Captured</div>
              <div className="card-content">
                <pre>{JSON.stringify(attendanceJSON, null, 2)}</pre>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-title">Current Semester Performance</div>
            <div className="card-content">
              <SemesterPerformance overall={overallAttendance} />
            </div>
          </div>

          <div className="card course-table">
            <div className="card-title">Course-wise Attendance</div>
            <div className="card-content">
              <CourseTable courses={courses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
