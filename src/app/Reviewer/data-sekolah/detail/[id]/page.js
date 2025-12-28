'use client';

import { useEffect, useState } from 'react';

export default function SchoolDetailPage() {
  // Mock data for the school
  const [schoolData, setSchoolData] = useState({
    name: "SMA N 1 Purwokerto",
    level: "SMA",
    website: "https://website-sekolah-project.vercel.app/",
    image: "https://placehold.co/900x450/5b7fd6/ffffff?text=SMA+NEGERI+1+PURWOKERTO",
    rating: 4,
    countyRanking: "25 dari 100",
    reviews: [
      {
        id: 1,
        reviewerName: "Nama Riviewer",
        date: "12 November 2025",
        rating: 4.7,
        reviewCount: 350,
        avatar: "NR"
      },
      {
        id: 2,
        reviewerName: "Nama Riviewer",
        date: "12 November 2025",
        rating: 4.7,
        reviewCount: 350,
        avatar: "NR"
      },
      {
        id: 3,
        reviewerName: "Nama Riviewer",
        date: "12 November 2025",
        rating: 4.7,
        reviewCount: 350,
        avatar: "NR"
      },
      {
        id: 4,
        reviewerName: "Nama Riviewer",
        date: "12 November 2025",
        rating: 4.7,
        reviewCount: 350,
        avatar: "NR"
      }
    ]
  });

  const StarIcon = ({ filled }) => (
    <svg 
      className={`w-10 h-10 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor" 
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const SmallStarIcon = () => (
    <svg 
      className="w-5 h-5 text-yellow-400" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="p-8 flex-1 overflow-auto">
      <h2 className="text-3xl font-bold mb-6">Detail Sekolah</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* School Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold mb-2">{schoolData.name}</h3>
            <div className="mb-3">
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold">
                {schoolData.level}
              </span>
            </div>
            <a 
              href={schoolData.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {schoolData.website}
            </a>
          </div>

          {/* School Image */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src={schoolData.image} 
              alt={schoolData.name}
              className="w-full"
            />
          </div>

          {/* Rating and Ranking */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-4 text-lg">Rating</h4>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= schoolData.rating} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-4 text-lg">Ranking Kabupaten</h4>
              <div className="text-center text-2xl font-bold">{schoolData.countyRanking}</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Reviewer Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg">Reviewer</h4>
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                4/5
              </span>
            </div>
          </div>

          {/* Review List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="font-bold mb-4 text-lg">Review data</h4>
            <div className="space-y-4">
              {schoolData.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{review.reviewerName}</div>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-15">
                    <SmallStarIcon />
                    <span className="font-semibold">{review.rating}</span>
                    <span className="text-sm text-gray-500">({review.reviewCount})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}