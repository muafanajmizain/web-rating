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

// Hook for fetching all schools (public endpoint)
export function usePublicSchools(filters = {}) {
  const params = new URLSearchParams();
  if (filters.jenjang && filters.jenjang !== 'semua') params.append('jenjang', filters.jenjang);
  if (filters.province_id) params.append('province_id', filters.province_id);
  if (filters.regency_id) params.append('regency_id', filters.regency_id);

  const query = params.toString();
  const url = `/api/schools${query ? `?${query}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR(
    url,
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
