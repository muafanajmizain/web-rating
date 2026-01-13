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
