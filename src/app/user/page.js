// src/app/user/page.js

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [topSchools, setTopSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopSchools();
  }, []);

  const fetchTopSchools = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/schools', {
        method: 'GET',
        headers: headers
      });

      const result = await response.json();
      
      console.log('API Response:', result);

      if (result.success) {
        const top3 = result.data.slice(0, 3);
        setTopSchools(top3);
      } else {
        setError(result.message || 'Gagal mengambil data sekolah');
      }
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section - Full Screen */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          TEMUKAN SEKOLAH TERBAIK DI DAERAHMU!
        </h1>
        <p className="text-base text-gray-700 mb-8 max-w-2xl mx-auto">
          Platform rating sekolah terpercaya untuk membantu Anda menemukan sekolah terbaik.
        </p>
        <Link
          href="/user/all-rankings"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition shadow-md"
        >
          Lihat Ranking Sekolah
        </Link>
      </div>
 
      {/* Top Ranking Section - Full Screen */}
      <div className="min-h-screen bg-white flex flex-col justify-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Top Ranking Website Sekolah
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Memuat data sekolah...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchTopSchools}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Coba Lagi
              </button>
            </div>
          ) : topSchools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Belum ada data sekolah</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {topSchools.map((school, index) => (
                <div key={school.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
                  {/* Image */}
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
                    {school.foto ? (
                      <img
                        src={school.foto}
                        alt={`Logo ${school.nama}`}
                        className="max-h-full max-w-full object-contain p-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          parent.innerHTML = '<span class="text-gray-500 text-sm">No Image</span>';
                        }}
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Top Ranking Badge with Verified Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block text-sm font-semibold px-3 py-1 rounded ${
                        index === 0 ? 'bg-blue-100 text-blue-700' :
                        index === 1 ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        Top Ranking {index + 1}
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
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
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
                          className="text-blue-600 hover:underline ml-1"
                        >
                          {school.website}
                        </a>
                      ) : (
                        <span className="text-gray-400 ml-1">Tidak tersedia</span>
                      )}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-gray-700">
                        {school.rating || 'N/A'} / 5.0
                        {school.total_reviews && (
                          <span className="text-gray-500 font-normal ml-1">
                            ({school.total_reviews})
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/user/school-detail/${school.id}`}
                      className="block w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium hover:bg-blue-700 text-center transition"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Link Lihat Semua Ranking */}
          <div className="text-center mt-8">
            <Link href="/user/all-rankings" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1">
              Lihat Semua Ranking →
            </Link>
          </div>
        </div>
      </div>

      {/* Reviewer Section - Full Screen */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Reviewer Website
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Reviewer 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Fathan Gufron Amrani</h3>
              <p className="text-sm text-gray-600 mb-2">Mahasiswa Informatika</p>
              <p className="text-xs text-gray-500 italic">"Website ini sangat membantu saya..."</p>
            </div>

            {/* Reviewer 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Fathan Gufron Amrani</h3>
              <p className="text-sm text-gray-600 mb-2">Mahasiswa Informatika</p>
              <p className="text-xs text-gray-500 italic">"Desainnya bersih dan mudah digunakan."</p>
            </div>

            {/* Reviewer 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Fathan Gufron Amrani</h3>
              <p className="text-sm text-gray-600 mb-2">Mahasiswa Informatika</p>
              <p className="text-xs text-gray-500 italic">"Informasi sekolah sangat lengkap..."</p>
            </div>
          </div>

          {/* Link Lihat Semua Reviewer */}
          <div className="text-center mt-8">
            <Link href="/user/all-reviewers" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1">
              Lihat Semua Reviewer →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}