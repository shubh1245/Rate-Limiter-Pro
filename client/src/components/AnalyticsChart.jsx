import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function AnalyticsChart({ data }) {
  return (
    <LineChart
      width={700}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="requests"
        stroke="#8884d8"
      />
    </LineChart>
  );
}

export default AnalyticsChart;