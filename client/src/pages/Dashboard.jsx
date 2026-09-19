import { useState, useEffect } from "react";
import API from "../services/api";

import StatCard from "../components/StatCard";
import PieChartCard from "../components/PieChartCard";
import EndpointChart from "../components/EndpointChart";

function Dashboard() {
  // Summary Data
  const [summary, setSummary] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    blockedRequests: 0,
  });

  // Endpoint Analytics Data
  const [endpointData, setEndpointData] = useState([]);

  // Fetch Dashboard Summary
  const fetchSummary = async () => {
    try {
      const response = await API.get("/analytics/summary");

      console.log("Summary:", response.data);

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Endpoint Analytics
  const fetchEndpointAnalytics = async () => {
    try {
      const response = await API.get(
        "/analytics/endpoints"
      );

      console.log(
        "Endpoint Data:",
        response.data
      );

      setEndpointData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Data When Page Loads
  useEffect(() => {
    fetchSummary();
    fetchEndpointAnalytics();
  }, []);

  // Pie Chart Data
  const pieData = [
    {
      name: "Success",
      value:
        summary.successfulRequests || 0,
    },
    {
      name: "Blocked",
      value:
        summary.blockedRequests || 0,
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>RateLimiter Pro Dashboard</h1>

      {/* Stat Cards */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "40px",
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

      {/* Pie Chart */}

      <h2>
        Success vs Blocked Requests
      </h2>

      <PieChartCard data={pieData} />

      {/* Endpoint Analytics */}

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        Top Endpoints
      </h2>

      <EndpointChart
        data={endpointData}
      />
    </div>
  );
}

export default Dashboard;