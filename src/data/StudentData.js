const studentData = {
  profile: {
    name: "John Smith",
    studentId: "2023001",
    year: "2nd Year",
    section: "A",
    department: "Computer Science"
  },

  overallAttendance: {
    percentage: 83.6,
    status: "Good"
  },

  courses: [
    { code: "CS101", name: "Introduction to Programming", attendance: 85, present: 34, total: 40 },
    { code: "CS102", name: "Data Structures", attendance: 78, present: 31, total: 40 },
    { code: "MATH201", name: "Calculus II", attendance: 92, present: 37, total: 40 },
    { code: "ENG101", name: "Technical Writing", attendance: 88, present: 35, total: 40 },
    { code: "PHY101", name: "Physics I", attendance: 75, present: 30, total: 40 }
  ]
};

export default studentData;
