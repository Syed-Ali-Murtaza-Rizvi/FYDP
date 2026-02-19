// Main Organizational Admin Dashboard Data

const orgAdminData = {
  overview: {
    totalAdmins: 4,
    activeAdmins: 3,
    eventAdmins: 3,
    participants: 3,
    students: 4,
    teachers: 3,
    pendingMeetings: 2
  },

  admins: [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      email: "rajesh@university.edu",
      organization: "ABC University",
      department: "Computer Science",
      status: "active",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Prof. Anita Sharma",
      email: "anita@university.edu",
      organization: "ABC University",
      department: "Electronics",
      status: "active",
      joinDate: "2023-03-20"
    },
    {
      id: 3,
      name: "Dr. Vijay Patel",
      email: "vijay@college.edu",
      organization: "XYZ College",
      department: "Mechanical",
      status: "active",
      joinDate: "2023-06-10"
    },
    {
      id: 4,
      name: "Prof. Neha Verma",
      email: "neha@university.edu",
      organization: "ABC University",
      department: "Civil",
      status: "inactive",
      joinDate: "2022-11-05"
    }
  ],

  eventAdmins: [
    {
      id: 1,
      name: "Event Coordinator 1",
      email: "events1@university.edu",
      organization: "ABC University",
      eventsManaged: 12,
      activeEvents: 3,
      status: "active",
      joinDate: "2023-02-10"
    },
    {
      id: 2,
      name: "Event Coordinator 2",
      email: "events2@college.edu",
      organization: "XYZ College",
      eventsManaged: 8,
      activeEvents: 2,
      status: "active",
      joinDate: "2023-04-15"
    },
    {
      id: 3,
      name: "Event Coordinator 3",
      email: "events3@university.edu",
      organization: "ABC University",
      eventsManaged: 5,
      activeEvents: 0,
      status: "inactive",
      joinDate: "2023-07-20"
    }
  ],

  meetings: [
    {
      id: 1,
      requester: "Dr. Rajesh Kumar",
      role: "Admin",
      purpose: "Budget Discussion",
       organization: "ABC University",
      department: "Computer Science",
      date: "2024-01-28",
      time: "10:00 AM",
      status: "pending"
    },
    {
      id: 2,
      requester: "Prof. Anita Sharma",
      role: "Admin",
      purpose: "New Course Approval",
      organization: "ABC University",
      department: "Electronics",
      date: "2024-01-29",
      time: "2:00 PM",
      status: "rejected"
    },
    {
      id: 3,
      requester: "Prof. Vijay Patel",
      role: "Teacher",
      purpose: "Equipment Request",
      organization: "ABC University",
      department: "Civil",
      date: "2024-01-27",
      time: "11:00 AM",
      status: "approved"
    }
  ],

  payments: [
    {
      id: 1,
      student: "Rahul Sharma",
      roll: "2023001",
      organization:"ABC University",
      type: "Tuition Fee",
      amount: 25000,
      dueDate: "2024-01-30",
      status: "On time",
      semester:"Spring 2024",
    },
    {
      id: 2,
      student: "Priya Patel",
      roll: "2023002",
       organization:"XYZ University",
      type: "Lab Fee",
      amount: 5000,
      dueDate: "2024-01-20",
      status: "6 days overdue",
       semester:"Spring 2024",
    }
  ],

  users: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@student.edu",
      role: "Student",
      organization: "ABC University",
      department: "CS",
      status: "online"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      email: "rajesh@university.edu",
      role: "Admin",
      organization: "ABC University",
      department: "CS",
      status: "online"
    },
    {
      id: 3,
      name: "Event Coordinator",
      email: "events@university.edu",
      role: "Event Admin",
      organization: "ABC University",
      department: "Admin",
      status: "offline"
    }
  ]
};

export default orgAdminData;
