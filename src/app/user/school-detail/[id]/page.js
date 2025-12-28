// src/app/user/school-detail/[id]/page.js

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function SchoolDetailPage() {
  const params = useParams();
  const schoolId = params.id;

  // Data dummy sekolah (nanti bisa diganti dengan fetch dari API/database)
  const schoolData = {
    '1': {
      name: 'SMP Negeri 1 Purwokerto',
      logo: '/images/smp1.png',
      website: 'smpn1purwokerto.sch.id',
      rating: 4.5,
      totalReviews: 280,
      reviewerCount: 0,
      maxReviewers: 3,
      topRanking: 3,
      verified: true
    },
    '2': {
      name: 'SMA Negeri 2 Purwokerto',
      logo: '/images/sma2.PNG',
      website: 'sman2purwokerto.sch.id',
      rating: 4.8,
      totalReviews: 350,
      reviewerCount: 2,
      maxReviewers: 3,
      topRanking: 2,
      verified: true
    },
    '3': {
      name: 'SMP Negeri 3 Purwokerto',
      logo: '/images/smp3.PNG',
      website: 'smpn3purwokerto.sch.id',
      rating: 4.7,
      totalReviews: 290,
      reviewerCount: 1,
      maxReviewers: 3,
      topRanking: 1,
      verified: true
    }
  };

  const school = schoolData[schoolId];

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-sm w-full max-w-3xl px-8 py-6 border-b border-gray-200">
        <h1 className="text-center text-xl font-bold text-gray-900 mb-4">
          Detail Ranking Website
        </h1>
        
        {/* School Name with Verified Badge */}
        <div className="flex items-center justify-center gap-2">
          <Link 
            href={`https://${school.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
          >
            {school.name}
          </Link>
          {school.verified && (
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
        <img 
          src={school.logo}
          alt={`Logo ${school.name}`}
          className="w-96 h-96 object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2dvPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-b-lg shadow-sm w-full max-w-3xl px-8 py-8 space-y-6">
        
        {/* Top Ranking Badge */}
        <div className="flex justify-center">
          <span className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold">
            Top Ranking {school.topRanking}
          </span>
        </div>

        {/* Website Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">Link Website:</p>
          <Link 
            href={`https://${school.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium break-all"
          >
            {school.website}
          </Link>
        </div>

        {/* Rating */}
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
            <span className="text-gray-500 font-normal"> ({school.totalReviews})</span>
          </p>
        </div>

        {/* Reviewer Count */}
        <div className="text-center">
          <p className="text-gray-700">
            <span className="font-semibold">Jumlah Reviewer:</span>{' '}
            {school.reviewerCount}/{school.maxReviewers}
          </p>
        </div>

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