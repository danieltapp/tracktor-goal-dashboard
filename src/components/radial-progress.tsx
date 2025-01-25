import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import queryClient from "../data/query-client";
import type { ActivityResponse } from "../data/fetch-activity";

export default function RadialProgress() {
  const data =
    (queryClient.getQueryData(["activity"]) as ActivityResponse) || null;

  const activityColors: Record<string, string> = {
    runs: "#8884d8",
    movies: "#83a6ed",
    books: "#82ca9d",
    commits: "#ffc658",
  };

  const chartData = data
    ?.filter((activity) => activity.activity_type !== "repositories")
    .map((activity) => ({
      uv: (activity.count / activity.goal) * 100,
      pv: activity.goal,
      fill: activityColors[activity.activity_type] || "#ccc",
      name: activity.activity_type,
    }));

  return (
    <div className="flex justify-center w-90 h-90">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            dataKey="uv"
            tick={false}
          />

          <RadialBar minPointSize={15} dataKey="uv" background fill="#364152" />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ marginTop: 20 }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
