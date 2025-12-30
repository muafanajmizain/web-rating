// src/app/user/school-detail/[id]/page.js

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SchoolDetailPage() {
  const params = useParams();
  const schoolId = params?.id;

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pastikan schoolId ada sebelum fetch
    if (schoolId) {
      fetchSchoolDetail();
    }
  }, [schoolId]); // Tambahkan schoolId ke dependency

  const fetchSchoolDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching school with ID:', schoolId);

      // Ambil token jika ada
      const token = localStorage.getItem('token');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Fetch detail sekolah berdasarkan ID
      const response = await fetch(`/api/schools/${schoolId}`, {
        method: 'GET',
        headers: headers
      });

      console.log('Response status:', response.status);

      const result = await response.json();
      
      console.log('School Detail Response:', result);

      if (result.success) {
        setSchool(result.data);
      } else {
        setError(result.message || 'Gagal mengambil detail sekolah');
      }
    } catch (err) {
      console.error('Error fetching school detail:', err);
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Memuat detail sekolah...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error}
          </h1>
          <div className="space-x-4">
            <button 
              onClick={fetchSchoolDetail}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Coba Lagi
            </button>
            <Link 
              href="/user" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // School Not Found
  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sekolah Tidak Ditemukan
          </h1>
          <Link 
            href="/user" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Format website URL
  const websiteUrl = school.website 
    ? (school.website.startsWith('http') ? school.website : `https://${school.website}`)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-sm w-full max-w-3xl px-8 py-6 border-b border-gray-200">
        <h1 className="text-center text-xl font-bold text-gray-900 mb-4">
          Detail Ranking Website
        </h1>
        
        {/* School Name with Verified Badge */}
        <div className="flex items-center justify-center gap-2">
          {websiteUrl ? (
            <Link 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              {school.nama}
            </Link>
          ) : (
            <span className="text-gray-900 font-semibold text-lg">
              {school.nama}
            </span>
          )}
          {school.is_claimed && (
            <svg 
              className="w-6 h-6 text-blue-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-gray-100 w-full max-w-3xl py-16 flex justify-center">
        {school.foto ? (
          <img 
            src={school.foto}
            alt={`Logo ${school.nama}`}
            className="w-96 h-96 object-contain"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2dvPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        ) : (
          <div className="w-96 h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">No Image</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-b-lg shadow-sm w-full max-w-3xl px-8 py-8 space-y-6">
        
        {/* Top Ranking Badge - hanya jika ada ranking */}
        {school.rank && (
          <div className="flex justify-center">
            <span className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold">
              Top Ranking {school.rank}
            </span>
          </div>
        )}

        {/* Website Link */}
        {websiteUrl && (
          <div className="text-center">
            <p className="text-gray-600 mb-2">Link Website:</p>
            <Link 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium break-all"
            >
              {school.website}
            </Link>
          </div>
        )}

        {/* Rating - hanya jika ada data rating */}
        {school.rating && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, index) => (
                <svg 
                  key={index}
                  className={`w-6 h-6 ${index < Math.floor(school.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 font-semibold text-lg">
              {school.rating} / 5.0 
              {school.total_reviews && (
                <span className="text-gray-500 font-normal"> ({school.total_reviews})</span>
              )}
            </p>
          </div>
        )}

        {/* Reviewer Count - jika ada */}
        {(school.reviewer_count !== undefined || school.max_reviewers) && (
          <div className="text-center">
            <p className="text-gray-700">
              <span className="font-semibold">Jumlah Reviewer:</span>{' '}
              {school.reviewer_count || 0}/{school.max_reviewers || 3}
            </p>
          </div>
        )}

        {/* Comment Button */}
        <div className="flex justify-center pt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-md transition shadow-sm flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                clipRule="evenodd" 
              />
            </svg>
            Komentar
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-6">
        <Link 
          href="/user"
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}