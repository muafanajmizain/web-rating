// src/app/Reviewer/data-sekolah/page.js

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useReviewerSchools } from '@/hooks/useSWR';

export default function Page() {
  const { schools: rawSchools, isLoading: loading, isError: error } = useReviewerSchools();

  const [jenjang, setJenjang] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  // Format and filter schools data
  const schoolsData = useMemo(() => {
    if (!rawSchools) return [];

    // Ambil ID sekolah yang sudah direview oleh user ini
    const myReviews = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('myReviews') || '[]')
      : [];
    const reviewedIds = new Set(myReviews.map(review => review.schoolId));

    // Filter hanya sekolah yang BELUM direview
    const unreviewedSchools = rawSchools.filter(school => !reviewedIds.has(school.id));

    // Format data sesuai struktur backend
    return unreviewedSchools.map(school => ({
      id: school.id,
      name: school.nama || 'Nama Sekolah Tidak Tersedia',
      jenjang: school.jenjang || 'SMA',
      image: school.image_url || `https://placehold.co/300x150/6B7FD7/ffffff?text=${encodeURIComponent(school.nama || 'Sekolah')}`,
      url: school.website || '#',
      reviewer: `${school.reviewer_count || 0}/${school.total_reviewer || 5}`
    }));
  }, [rawSchools]);

  // Filter berdasarkan input
  const filtered = useMemo(() => {
    let data = [...schoolsData];

    if (jenjang) {
      data = data.filter(d => d.jenjang === jenjang);
    }

    if (status) {
      data = data.filter(d => {
        const val = parseInt(d.reviewer.split('/')[0], 10);
        if (status === 'belum') return val === 0;
        if (status === 'sebagian') return val >= 1 && val <= 4;
        if (status === 'selesai') return val === 5;
        return true;
      });
    }

    if (search) {
      data = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [jenjang, status, search, schoolsData]);

  // Render UI
  if (loading) {
    return (
      <div className="p-8 flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
        <span className="text-gray-600">Memuat daftar sekolah...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
          <h3 className="text-lg font-bold text-red-800 mb-2">Gagal Memuat Data</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 flex-1 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Daftar Sekolah</h2>

      {/* Filter dan Pencarian */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select
          onChange={(e) => setJenjang(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Semua Jenjang</option>
          <option value="SMA">SMA</option>
          <option value="SMK">SMK</option>
          <option value="MAN">MAN</option>
        </select>

        <select
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Status Reviewer</option>
          <option value="belum">Belum (0/5)</option>
          <option value="sebagian">Sebagian (1–4)</option>
          <option value="selesai">Selesai (5/5)</option>
        </select>

        <input
          type="text"
          placeholder="Cari nama sekolah..."
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none flex-1 min-w-0"
        />
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-white border-b border-gray-200">
              <tr className="font-semibold text-gray-600">
                <th className="px-3 py-2.5 text-left">No</th>
                <th className="px-3 py-2.5 text-left">Nama Sekolah</th>
                <th className="px-3 py-2.5 text-center">Jenjang</th>
                <th className="px-3 py-2.5 text-center">Reviewer</th>
                <th className="px-3 py-2.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-3 py-5 text-center text-gray-400">
                    Tidak ada data yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filtered.map((school, index) => (
                  <tr key={school.id} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-2.5">{index + 1}</td>
                    <td className="px-3 py-2.5 font-medium text-gray-800">
                      {school.name}
                      <br />
                      <a
                        href={school.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mt-0.5 inline-block"
                      >
                        {school.url === '#' ? 'Website tidak tersedia' : school.url}
                      </a>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {school.jenjang}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {school.reviewer}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/Reviewer/data-sekolah/detail/${school.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold transition"
                        >
                          Detail
                        </Link>
                        <Link
                          href={`/Reviewer/data-sekolah/nilai/${school.id}`}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-semibold transition"
                        >
                          Nilai
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}