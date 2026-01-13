// src/app/user/all-rankings/page.js
'use client'
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePublicSchools } from '@/hooks/useSWR';

export default function AllRankingsPage() {
  const [jenjang, setJenjang] = useState('semua');
  const { schools: rawSchools, isLoading: loading, isError: error, mutate } = usePublicSchools();

  // Add rank to schools
  const schools = useMemo(() => {
    return rawSchools.map((school, index) => ({
      ...school,
      rank: index + 1
    }));
  }, [rawSchools]);

  const filteredSchools = jenjang === 'semua' 
    ? schools 
    : schools.filter(school => school.jenjang === jenjang);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-xl font-bold text-gray-800">Top Ranking Website Sekolah</h1>
        <p className="text-sm text-gray-500 mt-1">Daftar lengkap sekolah terbaik berdasarkan penilaian pengguna</p>
      </div>

      {/* Filter Jenjang */}
      <div className="px-6 py-4 bg-white border-b">
        <label className="mr-4 font-medium">Jenjang:</label>
        <select
          value={jenjang}
          onChange={(e) => setJenjang(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="semua">Semua Jenjang</option>
          <option value="SMA/SMK/MA">SMA/SMK/MA</option>
          <option value="SMP/MTS">SMP/MTS</option>
          <option value="SD/MI">SD/MI</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat data sekolah...</p>
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Gagal mengambil data sekolah</p>
            <button
              onClick={() => mutate()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      ) : filteredSchools.length === 0 ? (
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">
              {jenjang === 'semua' 
                ? 'Belum ada data sekolah' 
                : `Tidak ada sekolah dengan jenjang ${jenjang}`}
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Image */}
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {school.foto ? (
                    <img
                      src={school.foto}
                      alt={school.nama}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        parent.innerHTML = '<span class="text-gray-400">No Image</span>';
                      }}
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Top Ranking Badge with Verified Icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-block text-sm font-semibold px-3 py-1 rounded ${
                      school.rank === 1 ? 'bg-blue-100 text-blue-700' :
                      school.rank === 2 ? 'bg-green-100 text-green-700' :
                      school.rank === 3 ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      Top Ranking {school.rank}
                    </span>
                    {/* Verified Badge - Centang Biru jika claimed, Abu jika belum */}
                    {school.is_claimed ? (
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* School Name */}
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Nama Sekolah : {school.nama}
                  </h3>

                  {/* Website Link */}
                  <p className="text-sm text-gray-600 mb-3">
                    Link Website : 
                    {school.website ? (
                      <a 
                        href={school.website.startsWith('http') ? school.website : `https://${school.website}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline ml-1 break-all"
                      >
                        {school.website}
                      </a>
                    ) : (
                      <span className="text-gray-400 ml-1">Tidak tersedia</span>
                    )}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-700 ml-1">
                      {school.rating || 'N/A'} / 5
                      {school.total_reviews && (
                        <span className="text-gray-500 font-normal ml-1">
                          ({school.total_reviews})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Tombol Lihat Detail */}
                  <Link 
                    href={`/user/school-detail/${school.id}`} 
                    className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 text-center transition"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="py-6 text-center text-gray-500 text-sm">
        {!loading && !error && filteredSchools.length > 0 && (
          <p>Menampilkan {filteredSchools.length} sekolah</p>
        )}
      </div>
    </div>
  );
}