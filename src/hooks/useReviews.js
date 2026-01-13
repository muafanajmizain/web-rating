// src/hooks/useReviews.js
import useSWR from 'swr';
import { publicFetcher } from '@/lib/swr-config';

// Hook for fetching reviews by school ID
export function useSchoolReviews(schoolId) {
  const { data, error, isLoading, mutate } = useSWR(
    schoolId ? `/api/reviews/school/${schoolId}` : null,
    publicFetcher
  );

  return {
    reviews: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
