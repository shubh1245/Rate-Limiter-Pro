import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function RequestLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/analytics/logs"
      );

      setLogs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Request Logs
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor all API requests
            processed by Rate Limiter Pro
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-slate-500 text-sm">
              Total Logs
            </h3>

            <p className="text-3xl font-bold mt-2">
              {logs.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-slate-500 text-sm">
              Success Requests
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {
                logs.filter(
                  (log) =>
                    log.status ===
                    "SUCCESS"
                ).length
              }
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-slate-500 text-sm">
              Blocked Requests
            </h3>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {
                logs.filter(
                  (log) =>
                    log.status ===
                    "BLOCKED"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              API Request History
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800 text-white">

                <tr>
                  <th className="text-left p-4">
                    Endpoint
                  </th>

                  <th className="text-left p-4">
                    Method
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    IP Address
                  </th>

                  <th className="text-left p-4">
                    Created At
                  </th>
                </tr>

              </thead>

              <tbody>

                {logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="
                        text-center
                        py-10
                        text-slate-500
                      "
                    >
                      No logs found
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log._id}
                      className="
                        border-b
                        hover:bg-slate-50
                        transition
                      "
                    >

                      <td className="p-4 font-medium">
                        {log.endpoint}
                      </td>

                      <td className="p-4">
                        <span
                          className="
                            bg-blue-100
                            text-blue-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                          "
                        >
                          {log.method}
                        </span>
                      </td>

                      <td className="p-4">

                        {log.status ===
                        "SUCCESS" ? (
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
                            SUCCESS
                          </span>
                        ) : (
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
                            BLOCKED
                          </span>
                        )}

                      </td>

                      <td className="p-4 text-slate-600">
                        {log.ipAddress}
                      </td>

                      <td className="p-4 text-slate-600">
                        {new Date(
                          log.createdAt
                        ).toLocaleString()}
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default RequestLogs;