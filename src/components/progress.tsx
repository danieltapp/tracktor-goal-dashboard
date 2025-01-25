import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "../data/fetch-activity";
import RadialProgress from "./radial-progress";
import TracktorProgress from "./tracktor-progress";

export const Progress: React.FC = () => {
  const { isLoading, error } = useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivity,
  });

  if (isLoading) return <></>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-row justify-center items-center gap-8 p-2">
      <div className="w-[400px] h-[400px] flex justify-center items-center">
        <RadialProgress />
      </div>
      <div className="w-[400px]">
        <TracktorProgress />
      </div>
    </div>
  );
};

export default Progress;
