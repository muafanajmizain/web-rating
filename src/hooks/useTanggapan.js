// src/hooks/useTanggapan.js
import useSWR from 'swr';

const fetcherWithAuth = async (url) => {
  // Contoh ambil token dari localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token tidak ditemukan. Pastikan user sudah login.');
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const json = await res.json();

  if (!res.ok) {
    // biar pesan errornya kebawa rapi
    const message = json?.message || 'Gagal mengambil data';
    throw new Error(message);
  }

  return json;
};

export function useTanggapan(reviewId) {
  // jika reviewId belum ada, SWR tidak fetch (key = null)
  const key = reviewId ? `/api/tanggapan?reviewId=${reviewId}` : null;

  const { data, error, isLoading, mutate } = useSWR(key, fetcherWithAuth, {
    revalidateOnFocus: true,
  });

  return {
    data: data?.data ?? [],
    raw: data,
    isLoading,
    isError: !!error,
    errorMessage: error?.message,
    mutate,
  };
}
