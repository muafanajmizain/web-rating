// src/hooks/useNotifications.js
import useSWR from "swr";
import { authFetcher } from "@/lib/swr-config";

// Hook for fetching all notifications for the logged-in user
export function useNotifications() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/notifications",
    authFetcher
  );

  return {
    notifications: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching a single notification by ID
export function useNotificationDetail(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/notifications/${id}` : null,
    authFetcher
  );

  return {
    notification: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Function to mark notification as read
export async function markNotificationAsRead(id) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`/api/notifications/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isRead: true }),
  });

  return response.json();
}
