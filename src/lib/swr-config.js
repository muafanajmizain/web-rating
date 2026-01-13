// src/lib/swr-config.js

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

// Global fetcher for public endpoints (no auth)
export const publicFetcher = async (url) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    const error = new Error('Gagal mengambil data');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

// Global fetcher with auth token
export const authFetcher = async (url) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, { headers });

  if (!response.ok) {
    const error = new Error('Gagal mengambil data');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

// Default SWR config options
export const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 10000,
  errorRetryCount: 3,
  shouldRetryOnError: true,
};
