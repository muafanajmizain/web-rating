// src/app/Reviewer/data-sekolah/detail/[id]/page.js
'use client';

import { use } from 'react';
import { useSchoolDetailLocal } from '@/hooks/useSWR';

export default function SchoolDetailPage({ params }) {
  const { id } = use(params);
  const { school, isLoading: loading, isError: error } = useSchoolDetailLocal(id);

  if (loading) return <div className="p-8">Memuat detail...</div>;
  if (error) return <div className="p-8">Gagal memuat data sekolah.</div>;
  if (!school) return <div className="p-8">Sekolah tidak ditemukan.</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Detail Sekolah</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <h3 className="text-2xl font-bold">{school.nama || school.name}</h3>
        <p className="mt-2">Jenjang: {school.jenjang || school.level || 'Tidak tersedia'}</p>
        <p>Reviewer: {school.reviewer_count || 0} dari {school.total_reviewer || 5}</p>
        {school.website && (
          <a href={school.website} target="_blank" rel="noopener" className="text-blue-600">
            Kunjungi Website
          </a>
        )}
      </div>
    </div>
  );
}
