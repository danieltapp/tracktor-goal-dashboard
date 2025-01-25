import { supabase } from "./supabase-client";

export type ActivityResponse =
  | {
      activity_type: string;
      service: string;
      count: number;
      goal: number;
    }[]
  | null;

export const fetchActivity = async () => {
  const { error, data } = await supabase
    .from("tracktor_counts")
    .select("activity_type, service, count, goal")
    .eq("year", 2025);
  if (error) {
    throw new Error(error.details || "Failed to fetch activity data");
  }

  return data;
};
