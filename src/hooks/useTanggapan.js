// src/hooks/useTanggapan.js
import useSWR from "swr";

const fetcherWithAuth = async (url) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token tidak ditemukan. Pastikan user sudah login.");
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const json = await res.json();

  if (!res.ok) {
    const message = json?.message || "Gagal mengambil data";
    throw new Error(message);
  }

  return json;
};

// Hook for fetching reviews based on user role (from token)
export function useReviews() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/reviews",
    fetcherWithAuth,
    {
      revalidateOnFocus: true,
    },
  );

  return {
    reviews: data?.data ?? [],
    raw: data,
    isLoading,
    isError: !!error,
    errorMessage: error?.message,
    mutate,
  };
}

// Hook for fetching tanggapan/responses for a specific review
export function useTanggapan(reviewId) {
  const key = reviewId ? `/api/tanggapan?reviewId=${reviewId}` : null;

  const { data, error, isLoading, mutate } = useSWR(key, fetcherWithAuth, {
    revalidateOnFocus: true,
  });

  return {
    data: data?.data ?? [],
    raw: data,
    isLoading,
    isError: !!error,
    errorMessage: error?.message,
    mutate,
  };
}

// Hook for fetching single review detail by review ID
export function useReviewDetail(reviewId) {
  const key = reviewId ? `/api/reviews/${reviewId}` : null;

  const { data, error, isLoading, mutate } = useSWR(key, fetcherWithAuth, {
    revalidateOnFocus: true,
  });

  return {
    review: data?.data ?? null,
    raw: data,
    isLoading,
    isError: !!error,
    errorMessage: error?.message,
    mutate,
  };
}

// Hook for fetching reviews by school ID
export function useReviewsBySchool(schoolId) {
  const key = schoolId ? `/api/reviews/school/${schoolId}` : null;

  const { data, error, isLoading, mutate } = useSWR(key, fetcherWithAuth, {
    revalidateOnFocus: true,
  });

  return {
    reviews: data?.data ?? [],
    raw: data,
    isLoading,
    isError: !!error,
    errorMessage: error?.message,
    mutate,
  };
}

// Function to send a response/message in review chat
export async function sendResponse(reviewId, pesan) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token tidak ditemukan. Pastikan user sudah login.");
  }

  const response = await fetch(`/api/reviews/${reviewId}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pesan }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Gagal mengirim pesan");
  }

  return data;
}

// Function to create a new review
export async function createReview({ reviewer_id, school_id, items }) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token tidak ditemukan. Pastikan user sudah login.");
  }

  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      reviewer_id,
      school_id,
      items,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Gagal membuat review");
  }

  return data;
}
