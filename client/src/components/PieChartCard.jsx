import { PieChart, Pie, Tooltip, Legend } from "recharts";

function PieChartCard({ data }) {

  return (

    <PieChart
      width={400}
      height={300}
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      />

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default PieChartCard;