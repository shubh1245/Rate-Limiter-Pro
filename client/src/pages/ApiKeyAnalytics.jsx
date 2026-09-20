import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function ApiKeyAnalytics() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/analytics/apikeys"
      );

      setKeys(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Summary Calculations

  const totalKeys = keys.length;

  const activeKeys = keys.filter(
    (key) => key.status === "Active"
  ).length;

  const totalRequests = keys.reduce(
    (sum, key) =>
      sum + (key.totalRequests || 0),
    0
  );

  const totalBlocked = keys.reduce(
    (sum, key) =>
      sum + (key.blockedRequests || 0),
    0
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            API Key Analytics
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor API key usage,
            traffic and activity
          </p>
        </div>

        {/* Summary Cards */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
            mb-8
          "
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Total Keys
            </h3>

            <p className="text-3xl font-bold mt-2">
              {totalKeys}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Active Keys
            </h3>

            <p className="text-3xl font-bold mt-2 text-green-600">
              {activeKeys}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Total Requests
            </h3>

            <p className="text-3xl font-bold mt-2 text-blue-600">
              {totalRequests}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Blocked Requests
            </h3>

            <p className="text-3xl font-bold mt-2 text-red-600">
              {totalBlocked}
            </p>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              API Key Statistics
            </h2>
          </div>

          {keys.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No API Keys Found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left p-4">
                      API Key
                    </th>

                    <th className="text-left p-4">
                      Total Requests
                    </th>

                    <th className="text-left p-4">
                      Success
                    </th>

                    <th className="text-left p-4">
                      Blocked
                    </th>

                    <th className="text-left p-4">
                      Last Used
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {keys.map((key) => (
                    <tr
                      key={key._id}
                      className="
                        border-b
                        hover:bg-slate-50
                        transition
                      "
                    >
                      <td className="p-4 font-mono text-sm">
                        {key.key}
                      </td>

                      <td className="p-4 font-semibold">
                        {key.totalRequests}
                      </td>

                      <td className="p-4">
                        <span
                          className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                          "
                        >
                          {key.successfulRequests}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className="
                            bg-red-100
                            text-red-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                          "
                        >
                          {key.blockedRequests}
                        </span>
                      </td>

                      <td className="p-4 text-slate-600">
                        {key.lastUsed &&
                        key.lastUsed !== "Never"
                          ? new Date(
                              key.lastUsed
                            ).toLocaleString()
                          : "Never"}
                      </td>

                      <td className="p-4">
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                            ${
                              key.status ===
                              "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {key.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}
        </div>

        {/* Footer */}

        <div
          className="
            text-center
            text-slate-500
            mt-10
          "
        >
          Rate Limiter Pro © 2026
        </div>

      </div>
    </>
  );
}

export default ApiKeyAnalytics;