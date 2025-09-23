import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Modal from "./Modal";

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
}

interface ExamStats {
  attended: number;
  cleared: number;
  pending: number;
  nextExam: string;
}

interface AttendanceDataPoint {
  date: string;
  attendedExams: number;
}

interface DashboardPageProps {
  user: UserProfile;
  stats: ExamStats;
  attendanceData: AttendanceDataPoint[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardPageLayout: React.FC<DashboardPageProps> = ({
  user,
  stats,
  attendanceData,
}) => {
  // Data for Pie Chart (exam results breakdown)
  const pieData = [
    { name: "Attended", value: stats.attended },
    { name: "Cleared", value: stats.cleared },
    { name: "Pending", value: stats.pending },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
 const [cardtitle, setTitle] = useState('');

  const handleShowCardDetails = (details:string) => {
    setModalOpen(true);
    setTitle(details)
  };
  return (
    <>
      <div
        className="dashboard-container"
        style={{ padding: 20, fontFamily: "Arial, sans-serif" }}
      >
        {/* Exam Summary Cards */}
        <section
          className="summary-cards"
          aria-label="Exam Statistics Summary"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {[
            {
              label: "Attended Exams",
              value: stats.attended,
              color: "#4caf50",
            },
            { label: "Cleared Exams", value: stats.cleared, color: "#2196f3" },
            { label: "Pending Exams", value: stats.pending, color: "#ff9800" },
            { label: "Next Exam", value: stats.nextExam, color: "#9c27b0" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="card"
              tabIndex={0}
              onClick={()=>handleShowCardDetails(label)}
              style={{
                background: color,
                color: "#fff",
                padding: 20,
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: label === "Next Exam" ? 16 : 24,
                userSelect: "none",
              }}
            >
              <h3 style={{ marginBottom: 8, fontWeight: "600", fontSize: 18 }}>
                {label}
              </h3>
              <p>{value}</p>
            </div>
          ))}
        </section>

        {/* Graph Section */}
        <section
          className="graphs-section"
          aria-label="Exam Performance Graphs"
          style={{ marginBottom: 40 }}
        >
          <h3 style={{ marginBottom: 20, fontWeight: "600" }}>
            Exam Performance
          </h3>
          <div
            className="graphs-container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              justifyContent: "space-around",
            }}
          >
            {/* Pie Chart */}
            <div style={{ width: 300, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: any) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart for Attendance Over Time */}
            <div style={{ width: 500, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendedExams"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={cardtitle}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16,
          }}
        ></div>
      </Modal>
    </>
  );
};

export default DashboardPageLayout;
