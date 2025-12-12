// src/data/AdminData.js
const adminData = {
  years: ["2021", "2022", "2023", "2024"],
  batches: ["2021", "2022", "2023", "2024"],
  programs: ["CSIT", "AI", "CYBER"],
  departments: ["Computer Science", "Electronics", "Math"],
  courses: [
    { code: "CS301", name: "Database Management Systems" },
    { code: "CS401", name: "Distributed Systems" },
    { code: "CS501", name: "Advanced Algorithms" }
  ],

  // attendance records keyed by course code (demo)
  studentAttendanceRecords: {
    CS301: [
      { roll: "2023001", name: "Rahul Sharma", batch: "2023", program: "A", total: 30, attended: 28, percent: 93.3 },
      { roll: "2023002", name: "Priya Patel", batch: "2023", program: "A", total: 30, attended: 25, percent: 83.3 },
      { roll: "2023003", name: "Amit Kumar", batch: "2023", program: "A", total: 30, attended: 27, percent: 90.0 },
      { roll: "2023006", name: "Kavya Singh", batch: "2023", program: "A", total: 30, attended: 29, percent: 96.7 },
      { roll: "2023007", name: "Ravi Kumar", batch: "2023", program: "A", total: 30, attended: 22, percent: 73.3 }
    ]
  },

  // pending update requests demo
  attendanceRequests: [
    {
      id: "req1",
      teacher: "Prof. Sharma",
      studentName: "Amit Kumar",
      studentRoll: "2023045",
      batch: "2023",
      program: "A",
      date: "2024-11-10",
      slots: 2,
      course: "CS301 - Database Management Systems",
      reason: "Student was absent due to illness"
    },
    {
      id: "req2",
      teacher: "Prof. Verma",
      studentName: "Priya Patel",
      studentRoll: "2023012",
      batch: "2023",
      program: "A",
      date: "2024-11-05",
      slots: 1,
      course: "CS401 - Distributed Systems",
      reason: "Medical leave"
    }
  ],

  // students (for manage students view)
  students: [
    { roll: "2023001", name: "Rahul Sharma", year: "2023", batch: "2023", program: "A", total: 45, attended: 42 },
    { roll: "2023002", name: "Priya Patel", year: "2023", batch: "2023", program: "A", total: 30, attended: 25 }
  ],

  // teachers (for manage teachers view)
  teachers: [
    { id: "T001", name: "Prof. Sharma", email: "sharma@uni.edu", dept: "Computer Science", courses: ["CS301","CS401"] },
    { id: "T002", name: "Dr. Verma", email: "verma@uni.edu", dept: "Computer Science", courses: ["CS501"] }
  ]
};

export default adminData;
