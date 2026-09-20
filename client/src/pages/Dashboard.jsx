import { useState, useEffect } from "react";
import API from "../services/api";

import StatCard from "../components/StatCard";
import PieChartCard from "../components/PieChartCard";
import EndpointChart from "../components/EndpointChart";
import TrafficChart from "../components/TrafficChart";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

import socket from "../services/socket";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    blockedRequests: 0,
  });

  const [endpointData, setEndpointData] = useState([]);
  const [trafficData, setTrafficData] = useState([]);

  const fetchSummary = async () => {
    try {
      const response = await API.get("/analytics/summary");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEndpointAnalytics = async () => {
    try {
      const response = await API.get("/analytics/endpoints");
      setEndpointData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrafficData = async () => {
    try {
      const response = await API.get(
        "/analytics/requests-per-day"
      );

      setTrafficData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchSummary(),
          fetchEndpointAnalytics(),
          fetchTrafficData(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    socket.on("request-update", () => {
      fetchSummary();
      fetchEndpointAnalytics();
      fetchTrafficData();
    });

    return () => {
      socket.off("request-update");
    };
  }, []);

  const pieData = [
    {
      name: "Success",
      value: summary.successfulRequests || 0,
    },
    {
      name: "Blocked",
      value: summary.blockedRequests || 0,
    },
  ];

  const successRate =
    summary.totalRequests > 0
      ? (
          (summary.successfulRequests /
            summary.totalRequests) *
          100
        ).toFixed(1)
      : 0;

  const blockRate =
    summary.totalRequests > 0
      ? (
          (summary.blockedRequests /
            summary.totalRequests) *
          100
        ).toFixed(1)
      : 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Dashboard Overview
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor API traffic, blocked requests,
              rate limits and endpoint analytics.
            </p>
          </div>

          <div
            className="
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
              font-medium
              animate-pulse
            "
          >
            ● Live Monitoring
          </div>
        </div>

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-5
            gap-6
            mb-10
          "
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

          <StatCard
            title="Success Rate"
            value={`${successRate}%`}
          />

          <StatCard
            title="Block Rate"
            value={`${blockRate}%`}
          />
        </div>

        {/* Charts */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
            mb-10
          "
        >
          <div
            className="
              bg-white
              rounded-xl
              shadow-lg
              p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4">
              Success vs Blocked
            </h2>

            <PieChartCard data={pieData} />
          </div>

          <div
            className="
              bg-white
              rounded-xl
              shadow-lg
              p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4">
              Daily Traffic
            </h2>

            <TrafficChart data={trafficData} />
          </div>
        </div>

        {/* Endpoint Analytics */}
        <div
          className="
            bg-white
            rounded-xl
            shadow-lg
            p-6
          "
        >
          <h2 className="text-xl font-semibold mb-4">
            Top Endpoints
          </h2>

          {endpointData.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              No endpoint data found
            </div>
          ) : (
            <EndpointChart data={endpointData} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 mt-10">
          Rate Limiter Pro © 2026
        </div>

      </div>
    </div>
  );
}

export default Dashboard;