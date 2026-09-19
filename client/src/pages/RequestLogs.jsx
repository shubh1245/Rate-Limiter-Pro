import { useEffect, useState } from "react";
import API from "../services/api";

function RequestLogs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await API.get("/analytics/logs");

      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Request Logs</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Status</th>
            <th>IP Address</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.endpoint}</td>
              <td>{log.method}</td>
              <td>{log.status}</td>
              <td>{log.ipAddress}</td>
              <td>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestLogs;