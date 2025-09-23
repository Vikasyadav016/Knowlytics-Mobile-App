import DashboardPageLayout from "../CommonComponents/Dashboardlayout";

const user = {
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=3",
  role: "Student",
};

const stats = {
  attended: 15,
  cleared: 12,
  pending: 3,
  nextExam: "2025-10-10",
};

const attendanceData = [
  { date: "Jan", attendedExams: 1 },
  { date: "Feb", attendedExams: 3 },
  { date: "Mar", attendedExams: 2 },
  { date: "Apr", attendedExams: 4 },
  { date: "May", attendedExams: 5 },
  { date: "Jun", attendedExams: 0 },
];

export default function UserDashboard() {
  return (
    <DashboardPageLayout
      user={user}
      stats={stats}
      attendanceData={attendanceData}
    />
  );
}
