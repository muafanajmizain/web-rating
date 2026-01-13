// src/hooks/useSchools.js
import useSWR from 'swr';
import { authFetcher, publicFetcher } from '@/lib/swr-config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

// Hook for fetching all schools (auth required, direct API)
export function useSchools() {
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/api/schools`,
    authFetcher
  );

  return {
    schools: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching all schools (public endpoint via Next.js API route)
export function usePublicSchools() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/schools',
    publicFetcher
  );

  return {
    schools: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching reviewer schools (with auth via local API route)
export function useReviewerSchools() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/schools',
    authFetcher
  );

  return {
    schools: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
