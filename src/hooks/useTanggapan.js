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
