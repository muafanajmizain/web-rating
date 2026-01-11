// src/app/Reviewer/data-sekolah/detail/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';

export default function SchoolDetailPage({ params }) {
  const { id } = use(params);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`/api/schools/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setSchool(data);
        }
      } catch (e) {}
      setLoading(false);
    };
    fetchSchool();
  }, [id]);

  if (loading) return <div className="p-8">Memuat detail...</div>;
  if (!school) return <div className="p-8">Sekolah tidak ditemukan.</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Detail Sekolah</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <h3 className="text-2xl font-bold">{school.name}</h3>
        <p className="mt-2">Jenjang: {school.level || 'Tidak tersedia'}</p>
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