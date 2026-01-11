// src/app/Reviewer/review-saya/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myReviews');
    if (saved) {
      try {
        setMyReviews(JSON.parse(saved));
      } catch (e) {
        setMyReviews([]);
      }
    }
  }, []);

  return (
    <div className="p-6 flex-1 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Daftar Review Saya</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-6xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-white border-b">
              <tr className="font-semibold text-gray-600">
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Sekolah</th>
                <th className="px-4 py-3 text-center">Rating</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myReviews.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-400">Belum ada review.</td></tr>
              ) : (
                myReviews.map((review, i) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{review.schoolName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        ⭐ {review.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/Reviewer/review-saya/detail/${review.schoolId}`}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold"
                      >
                        Detail
                      </Link>
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