import { motion } from "motion/react";
import queryClient from "../data/query-client";
import type { ActivityResponse } from "../data/fetch-activity";

interface ProgressIndicatorProps {
  activities: ActivityResponse | null;
}

enum ActivityEmoji {
  runs = "🏃🏻‍♂️",
  movies = "🎬",
  books = "📚",
  commits = "💻",
}

const ProgressIndicator = ({ activities }: ProgressIndicatorProps) => {
  return (
    <div className="p-6 rounded-lg  w-full max-w-md mx-auto">
      {activities?.map((activity) => {
        const progress = Math.min((activity.count / activity.goal) * 100, 100);
        return (
          <div key={activity.activity_type} className="mb-4">
            <div className="text-gray-300 mb-2 flex justify-between">
              <span>
                {activity.activity_type === "commits"
                  ? "code commits"
                  : activity.activity_type}
              </span>
              <span>{`${activity.count} / ${activity.goal}`}</span>
            </div>

            <div className="relative w-full h-8 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 3, ease: "easeOut" }}
              />

              <motion.div
                className="absolute top-1/2 -translate-y-1/2 text-2xl"
                initial={{ left: 0 }}
                animate={{ left: `${progress}%` }}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                <span className="ml-2">
                  {
                    ActivityEmoji[
                      activity.activity_type as keyof typeof ActivityEmoji
                    ]
                  }
                </span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {Math.round(progress)}%
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const TracktorProgress: React.FC = () => {
  const fetchedActivites =
    (queryClient.getQueryData(["activity"]) as ActivityResponse) || null;
  const activities = fetchedActivites
    ? fetchedActivites.filter(
        (activity) => activity.activity_type !== "repositories"
      )
    : null;

  return <ProgressIndicator activities={activities} />;
};

export default TracktorProgress;
