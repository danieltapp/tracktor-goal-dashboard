import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type ActivityResponse, fetchActivity } from "../data/fetch-activity";
import RadialProgress from "./radial-progress";
import TracktorProgress from "./tracktor-progress";
import NumberFlow from "@number-flow/react";
import queryClient from "../data/query-client";
import { useEffect, useState } from "react";

export const Progress: React.FC = () => {
  const [overallProgress, setOverallProgress] = useState(0);
  const { isLoading, error } = useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivity,
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  const fetchedActivites =
    (queryClient.getQueryData(["activity"]) as ActivityResponse) || null;
  const goals = fetchedActivites
    ? fetchedActivites
        .filter((activity) => activity.activity_type !== "repositories")
        .reduce(
          (acc, activity) =>
            acc.concat({
              current: activity.count,
              goal: activity.goal,
            }),
          [] as { current: number; goal: number }[]
        )
    : null;

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31); // December 31st
  const calculatedDaysLeft = Math.ceil(
    (endOfYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    const totalCurrent =
      goals?.reduce((sum, goal) => sum + goal.current, 0) ?? 0;
    const totalGoal = goals?.reduce((sum, goal) => sum + goal.goal, 0) ?? 0;
    const calculatedOverallProgress =
      totalGoal > 0 ? ((totalCurrent / totalGoal) * 100).toFixed(2) : "0.00";

    setTimeout(() => {
      setOverallProgress(Number(calculatedOverallProgress));
    }, 250);
  }, [goals]);

  if (isLoading) return <></>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  return (
    <div className="py-4">
      <div>
        <p className="text-center text-large">
          <span className="mr-2">⏳</span>
          With <strong>{calculatedDaysLeft}</strong> days left in the year, I've
          hit{" "}
          <NumberFlow className="font-bold font-mono" value={overallProgress} />
          % of my goals for 2025.
          <span className="ml-2">⏳</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-2">
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex justify-center items-center">
          <RadialProgress />
        </div>
        <div className="w-[300px] md:w-[400px]">
          <TracktorProgress />
        </div>
      </div>
    </div>
  );
};

export default Progress;
