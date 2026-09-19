import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function EndpointChart({ data }) {

  return (
    <BarChart
      width={600}
      height={300}
      data={data}
    >

      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  );
}

export default EndpointChart;