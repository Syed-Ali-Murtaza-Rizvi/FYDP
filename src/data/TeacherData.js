const teacherData = {
  profile: {
    name: "Dr. Anjali Verma",
    teacherId: "T2021042",
    department: "Computer Science",
    avatar: "👩‍🏫",
    coursesTeaching: ["CS301", "CS401", "CS501"],
    email: "anjali.verma@example.com",
    password: "anjali2023"

  },

  batches: ["BSCS 1st Sem", "BSCS 2nd Sem", "BSCS 3rd Sem","BSCS 4th Sem"],
  programs: ["BSCS", "BSIT", "BSSE"],
  attendanceTypes: ["Lecture", "Lab"],

  courses: [
    { code: "CS301", name: "Database Management Systems" },
    { code: "CS401", name: "Distributed Systems" },
    { code: "CS501", name: "Advanced Algorithms" }
  ],

  dummyAttendanceList: [
    { name: "Rahul Sharma", roll: "2023001", mode: "RFID", time: "02:47:52 AM" },
    { name: "Priya Patel", roll: "2023002", mode: "RFID", time: "02:47:53 AM" },
    { name: "Amit Kumar", roll: "2023003", mode: "CV", time: "02:47:54 AM" },
    { name: "Sneha Reddy", roll: "2023004", mode: "RFID", time: "02:47:55 AM" }
  ]
};

export default teacherData;
