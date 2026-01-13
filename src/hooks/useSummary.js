// src/hooks/useSummary.js
import useSWR from 'swr';
import { publicFetcher } from '@/lib/swr-config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

export function useSummary() {
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/api/summary`,
    publicFetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    summary: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
