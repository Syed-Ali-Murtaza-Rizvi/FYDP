import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";
import CourseTable from "../../components/CourseTable";
import students from "../../data/StudentData";
import "./student.css";
import { Html5Qrcode } from "html5-qrcode";
import bgImage from "../../assets/background.jpeg";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [scannerOpen, setScannerOpen] = useState(false);
  const html5QrCodeRef = useRef(null);

  /* ================= GET CURRENT USER ================= */
  const profileData = useMemo(() => {
    const stored = localStorage.getItem("currentUser");
    if (!stored) return null;

    const currentUser = JSON.parse(stored);
    if (currentUser.role !== "student") return null;

    return students.find(
      (s) =>
        s.profile.studentId === currentUser.studentId ||
        s.email === currentUser.email
    );
  }, []);

  const profile = profileData?.profile;
  const overallAttendance = profileData?.overallAttendance;
  const courses = profileData?.courses || [];

  useEffect(() => {
    if (!profile) navigate("/login");
  }, [profile, navigate]);

  /* ================= QR SCANNER ================= */
  const stopScanner = async () => {
    if (!html5QrCodeRef.current) return;
    try {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
    } catch {}
    html5QrCodeRef.current = null;
    setScannerOpen(false);
  };

  const startScanner = () => setScannerOpen(true);

  useEffect(() => {
    if (!scannerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [scannerOpen]);

  useEffect(() => {
    if (!scannerOpen) return;

    const startQr = async () => {
      html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          handleScanSuccess
        );
      } catch {
        alert("Camera access failed.");
        stopScanner();
      }
    };

    startQr();
    return () => stopScanner();
  }, [scannerOpen]);

  const handleScanSuccess = (decodedText) => {
    stopScanner();
    try {
      const qrData = JSON.parse(decodedText);

      if (!courses.some((c) => c.code === qrData.course)) {
        alert("You are not enrolled in this course.");
        return;
      }

      console.log({
        studentName: profile.name,
        studentRollNo: profile.studentId,
        ...qrData,
        scannedAt: new Date().toISOString(),
      });
    } catch {
      alert("Invalid QR format.");
    }
  };

  if (!profile) return null;

  return (
    <div
      className="dashboard-bg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          {/* LEFT: Profile Card */}
          <ProfileCard profile={profile} onScanClick={startScanner} />

          {/* RIGHT: Main Content */}
          <div className="dashboard-right">
            {/* Welcome heading */}
            <div className="dashboard-welcome">
              <div className="welcome-text">
                <span className="mainhead">Welcome back,</span> {profile.name}!
              </div>
            </div>

            {/* QR Scanner Modal */}
            {scannerOpen && (
              <div
                className="qr-modal-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Scan QR Code"
                onClick={stopScanner}
              >
                <div
                  className="qr-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="qr-modal-header">
                    <h3>Scan QR Code</h3>
                    <button
                      type="button"
                      className="qr-modal-close"
                      onClick={stopScanner}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div id="qr-reader"></div>
                </div>
              </div>
            )}

            {/* Semester Performance */}
            <div className="performance-card">
              <div className="performance-header">
                Current Semester Performance
              </div>
              <div className="performance-body">
                <div className="attendance-section">
                  <p className="label">Overall Attendance</p>
                  <h1 className="percentage">{overallAttendance?.percentage}%</h1>
                </div>
                <div className="status-ring-wrapper">
                  <div className="status-section">
                    <p className="label">Status:</p>
                    <h2 className="status-text">{overallAttendance?.status}</h2>
                  </div>
                  <div className="progress-ring">
                    <svg width="90" height="90">
                      <circle className="ring-bg" cx="45" cy="45" r="38" />
                      <circle
                        className="ring-progress"
                        cx="45"
                        cy="45"
                        r="38"
                        style={{
                          strokeDasharray: 2 * Math.PI * 38,
                          strokeDashoffset:
                            2 * Math.PI * 38 * (1 - overallAttendance?.percentage / 100),
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Table */}
            <div className="performance-card">
              <div className="performance-header">Course-wise Attendance</div>
              <div className="card-content">
                <CourseTable courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;