import { useState, useEffect } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    blockedRequests: 0,
  });

  const fetchSummary = async () => {
    try {
      const response = await API.get("/analytics/summary");

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <StatCard
          title="Total Requests"
          value={summary.totalRequests}
        />

        <StatCard
          title="Successful Requests"
          value={summary.successfulRequests}
        />

        <StatCard
          title="Blocked Requests"
          value={summary.blockedRequests}
        />
      </div>
    </div>
  );
}

export default Dashboard;