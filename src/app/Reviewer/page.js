// src/app/Reviewer/page.js

"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { publicFetcher } from "@/lib/swr-config";

export default function ReviewerPage() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch school ranking (public endpoint - direct to backend)
  const {
    data: rankingData,
    error: rankingError,
    isLoading: rankingLoading,
  } = useSWR("/api/reviews/ranking/schools/level", publicFetcher);

  const schoolsData = rankingData?.data || [];

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/reviewers/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStats(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatsLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1)
      return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm">
          🥇
        </span>
      );
    if (rank === 2)
      return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-bold text-sm">
          🥈
        </span>
      );
    if (rank === 3)
      return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800 font-bold text-sm">
          🥉
        </span>
      );
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm">
        {rank}
      </span>
    );
  };

  return (
    <div className="p-6 flex-1 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Dashboard Reviewer</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white rounded-lg p-6">
          <p className="text-sm">Sekolah Sudah Direview</p>
          <p className="text-3xl font-bold">
            {statsLoading ? (
              <span className="inline-block w-10 h-8 bg-blue-400 rounded animate-pulse" />
            ) : (
              stats?.sudah_review || 0
            )}
          </p>
        </div>
        <div className="bg-emerald-500 text-white rounded-lg p-6">
          <p className="text-sm">Sekolah Belum Direview</p>
          <p className="text-3xl font-bold">
            {statsLoading ? (
              <span className="inline-block w-10 h-8 bg-emerald-400 rounded animate-pulse" />
            ) : (
              stats?.belum_review || 0
            )}
          </p>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Peringkat Sekolah
          </h3>
          <p className="text-sm text-gray-500">
            Berdasarkan rata-rata skor review
          </p>
        </div>

        {/* Loading */}
        {rankingLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-500">Memuat data...</span>
          </div>
        )}

        {/* Error */}
        {rankingError && (
          <div className="text-center py-12">
            <svg
              className="w-12 h-12 text-red-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600">Gagal memuat data peringkat</p>
          </div>
        )}

        {/* Empty */}
        {!rankingLoading && !rankingError && schoolsData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Belum ada data peringkat sekolah
          </div>
        )}

        {/* Table */}
        {!rankingLoading && !rankingError && schoolsData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="font-semibold text-gray-600">
                  <th className="px-4 py-3 text-center w-16">No</th>
                  <th className="px-4 py-3 text-left">Nama Sekolah</th>
                  <th className="px-4 py-3 text-center w-24">Review</th>
                  <th className="px-4 py-3 text-center w-24">Skor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schoolsData.map((school) => (
                  <tr
                    key={school.school_id || school.ranking}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-center">
                      {getRankBadge(Number(school.ranking))}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {school.school_name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-gray-500 text-xs">
                        {school.total_reviews} review
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        {Number(school.score).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
