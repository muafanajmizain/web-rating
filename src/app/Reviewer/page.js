// src/app/Reviewer/page.js

'use client';

import { useState, useEffect } from 'react';

export default function ReviewerPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/api/reviewers/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStats(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getStats();
  }, []);


  const [schoolsData] = useState([
    { rank: 1, name: "SMA N 1 Purwokerto", score: "3.528" },
    { rank: 2, name: "SMA IT Al-Irsyad", score: "3.301" },
    { rank: 3, name: "MAN 1 Banyumas", score: "2.851" },
    { rank: 4, name: "SMA N 2 Purwokerto", score: "2.745" },
    { rank: 5, name: "SMA Plus Al-Azhar", score: "2.689" },
    { rank: 6, name: "SMA N 3 Purwokerto", score: "2.634" },
    { rank: 7, name: "SMA Muhammadiyah 1 Purwokerto", score: "2.587" },
    { rank: 8, name: "SMA N 1 Sokaraja", score: "2.523" },
    { rank: 9, name: "SMA Telkom Purwokerto", score: "2.478" },
    { rank: 10, name: "SMA N 1 Banyumas", score: "2.431" }
  ]);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm">🥇</span>;
    if (rank === 2) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-bold text-sm">🥈</span>;
    if (rank === 3) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800 font-bold text-sm">🥉</span>;
    return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm">{rank}</span>;
  };

  return (
    <div className="p-6 flex-1 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Dashboard Reviewer</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white rounded-lg p-6">
          <p className="text-sm">Sekolah Sudah Direview</p>
          <p className="text-3xl font-bold">{stats?.sudah_review || 0}</p>
        </div>
        <div className="bg-emerald-500 text-white rounded-lg p-6">
          <p className="text-sm">Sekolah Belum Direview</p>
          <p className="text-3xl font-bold">{stats?.belum_review || 0}</p>
        </div>
      </div>

      {/* Table - disesuaikan dengan style Review Saya */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-white border-b border-gray-200">
              <tr className="font-semibold text-gray-600">
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Sekolah</th>
                <th className="px-4 py-3 text-center">Poin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schoolsData.map((school) => (
                <tr key={school.rank} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center">
                    {getRankBadge(school.rank)}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {school.name}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {school.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
