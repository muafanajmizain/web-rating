// src/hooks/useDashboardSummary.js
import useSWR from "swr";
import { authFetcher } from "@/lib/swr-config";

// Hook for fetching dashboard summary (role-based)
export function useDashboardSummary(limit = 100) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/summary?limit=${limit}`,
    authFetcher,
  );

  return {
    summary: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
