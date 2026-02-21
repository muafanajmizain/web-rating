// src/hooks/useAppSettings.js
import useSWR from 'swr';
import { publicFetcher, authFetcher } from '@/lib/swr-config';

// Hook for fetching app settings (public, no auth needed)
export function useAppSettings() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/settings',
    publicFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    settings: data?.data || null,
    isLoading,
    isError: error,
    mutate,
  };
}

// Function to update app settings (admin only)
export async function updateAppSettings(data) {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Gagal memperbarui pengaturan');
  }

  return result;
}
