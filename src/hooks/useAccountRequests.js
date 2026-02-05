// src/hooks/useAccountRequests.js
import useSWR from "swr";

// Local fetcher for Next.js API routes (with auth)
const localAuthFetcher = async (url) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const error = new Error("Gagal mengambil data");
    error.status = response.status;
    throw error;
  }

  return response.json();
};

// Hook for fetching all account requests
export function useAccountRequests() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/requests",
    localAuthFetcher
  );

  return {
    requests: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching a single account request by ID
export function useAccountRequestDetail(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/requests/${id}` : null,
    localAuthFetcher
  );

  return {
    request: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Function to accept a request
export async function acceptRequest(id) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`/api/requests/${id}/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Gagal menerima permintaan");
  }

  return data;
}

// Function to reject a request
export async function rejectRequest(id) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`/api/requests/${id}/reject`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Gagal menolak permintaan");
  }

  return data;
}
