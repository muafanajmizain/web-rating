// src/hooks/useReviews.js
import { authFetcher } from "@/lib/swr-config";
import useSWR from "swr";

// Hook for fetching reviews by school ID
export function useSchoolReviews(schoolId) {
  const { data, error, isLoading, mutate } = useSWR(
    schoolId ? `/api/reviews/school/${schoolId}` : null,
    authFetcher
  );

  return {
    reviews: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
