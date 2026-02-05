// src/hooks/useSchoolDetail.js
import useSWR from 'swr';
import { authFetcher } from '@/lib/swr-config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

// Hook for fetching school detail by ID (auth required, direct API)
export function useSchoolDetail(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${BASE_URL}/api/schools/${id}` : null,
    authFetcher
  );

  return {
    school: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching school detail via Next.js API route
export function useSchoolDetailLocal(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/schools/${id}` : null,
    authFetcher
  );

  return {
    school: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Function to update school data by manager (pengelola)
// Supports both JSON data and file upload via FormData
export async function updateSchoolByManager(schoolId, data, file = null) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  let body;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (file) {
    // Use FormData when there's a file to upload
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    formData.append("foto", file);
    body = formData;
  } else {
    // Use JSON when no file
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }

  const response = await fetch(`/api/schools/${schoolId}/update-manager`, {
    method: "PUT",
    headers,
    body,
  });

  const result = await response.json();

  // Check for success - backend may return either {success: true} or {status: "success"}
  const isSuccess = result.success === true || result.status === "success";

  if (!response.ok || !isSuccess) {
    const errorMessage =
      typeof result.message === "string"
        ? result.message
        : "Gagal memperbarui data sekolah";
    throw new Error(errorMessage);
  }

  return result;
}
