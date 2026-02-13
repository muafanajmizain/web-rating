// src/hooks/useIndicators.js
import useSWR from 'swr';
import { authFetcher, publicFetcher } from '@/lib/swr-config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

// ========================
// CATEGORIES
// ========================

// Hook for fetching all categories (public)
export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/api/indicators/categories`,
    publicFetcher
  );

  // Normalize 'nama' to 'name' for consistency
  const categories = (data?.data || []).map((cat) => ({
    ...cat,
    name: cat.nama || cat.name,
  }));

  return {
    categories,
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching single category by ID
export function useCategoryById(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${BASE_URL}/api/indicators/categories/${id}` : null,
    publicFetcher
  );

  // Normalize 'nama' to 'name' for consistency
  const category = data?.data ? {
    ...data.data,
    name: data.data.nama || data.data.name,
  } : null;

  return {
    category,
    isLoading,
    isError: error,
    mutate,
  };
}

// ========================
// INDICATORS
// ========================

// Hook for fetching all indicators (admin only)
export function useIndicators() {
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/api/indicators`,
    authFetcher
  );

  return {
    indicators: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching all indicators via public endpoints (for reviewers)
// This fetches all categories first, then all indicators for each category
export function useAllIndicatorsPublic() {
  // First fetch all categories
  const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading } = useSWR(
    `${BASE_URL}/api/indicators/categories`,
    publicFetcher
  );

  const categories = categoriesData?.data || [];
  const categoryIds = categories.map(cat => cat.id);

  // Create a stable key for fetching all indicators
  const indicatorsKey = categoryIds.length > 0
    ? `indicators-all-${categoryIds.join(',')}`
    : null;

  // Fetch all indicators from all categories
  const { data: indicatorsData, error: indicatorsError, isLoading: indicatorsLoading, mutate } = useSWR(
    indicatorsKey,
    async () => {
      const results = await Promise.all(
        categoryIds.map(id =>
          publicFetcher(`${BASE_URL}/api/indicators/category/${id}`)
        )
      );
      // Flatten all indicators from all categories
      return results.flatMap(result => result?.data || []);
    }
  );

  return {
    indicators: indicatorsData || [],
    categories,
    isLoading: categoriesLoading || indicatorsLoading,
    isError: categoriesError || indicatorsError,
    mutate,
  };
}

// Hook for fetching indicators by category (public)
export function useIndicatorsByCategory(categoryId) {
  const { data, error, isLoading, mutate } = useSWR(
    categoryId ? `${BASE_URL}/api/indicators/category/${categoryId}` : null,
    publicFetcher
  );

  return {
    indicators: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching single indicator by ID (admin only)
export function useIndicatorById(id) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${BASE_URL}/api/indicators/${id}` : null,
    authFetcher
  );

  return {
    indicator: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// ========================
// API FUNCTIONS (for mutations)
// ========================

// Create category
export async function createCategory(name) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${BASE_URL}/api/indicators/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({name}),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Gagal membuat kategori');
  }

  return data;
}

// Update category
export async function updateCategory(id, name) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${BASE_URL}/api/indicators/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({name}),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Gagal mengupdate kategori');
  }

  return data;
}

// Delete category
export async function deleteCategory(id) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${BASE_URL}/api/indicators/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Gagal menghapus kategori');
  }

  return data;
}

// Create indicator
export async function createIndicator({ category_id, judul, deskripsi }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${BASE_URL}/api/indicators`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ category_id, judul, deskripsi }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Gagal membuat indikator');
  }

  return data;
}

// Update indicator
export async function updateIndicator(id, { category_id, judul, deskripsi }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${BASE_URL}/api/indicators/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ category_id, judul, deskripsi }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Gagal mengupdate indikator');
  }

  return data;
}

// Delete indicator
export async function deleteIndicator(id) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${BASE_URL}/api/indicators/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Gagal menghapus indikator');
  }

  return data;
}