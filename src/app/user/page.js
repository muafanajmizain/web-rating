"use client";

import Link from "next/link";
import useSWR from "swr";
import { publicFetcher } from "@/lib/swr-config";

export default function DashboardPage() {
  // Fetch top 3 ranked schools (public)
  const { data: rankingData, isLoading: rankingLoading } = useSWR(
    "/api/reviews/ranking/schools",
    publicFetcher
  );
  const topSchools = rankingData?.data || [];

  // Fetch accepted reviewers (public)
  const { data: reviewerData, isLoading: reviewerLoading } = useSWR(
    "/api/requests/reviewers/public",
    publicFetcher
  );
  const reviewers = reviewerData?.data || [];
  const displayedReviewers = reviewers.slice(0, 3);

  const getRankBadge = (rank) => {
    if (rank === 1) return "bg-yellow-500";
    if (rank === 2) return "bg-gray-400";
    if (rank === 3) return "bg-orange-400";
    return "bg-blue-600";
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-0 pb-32 bg-gray-100">
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            TEMUKAN SEKOLAH TERBAIK DI DAERAHMU!
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-10 max-w-3xl mx-auto">
            Platform rating sekolah terpercaya untuk membantu Anda menemukan
            sekolah terbaik.
          </p>

          <Link
            href="/user/all-rankings"
            className="inline-block border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-lg font-semibold text-base
             hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Lihat Ranking Sekolah
          </Link>
        </div>
      </section>

      {/* Top 3 Ranking Section */}
      <div className="min-h-screen bg-white flex flex-col justify-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Top Ranking Website Sekolah
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Sekolah dengan rata-rata skor tertinggi berdasarkan penilaian reviewer
          </p>

          {/* Loading */}
          {rankingLoading && (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Empty */}
          {!rankingLoading && topSchools.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg">Belum ada data peringkat sekolah</p>
            </div>
          )}

          {/* Cards */}
          {!rankingLoading && topSchools.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {topSchools.map((school) => (
                <div
                  key={school.school_id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition"
                >
                  <div className={`w-full h-48 ${getRankBadge(Number(school.ranking))} flex items-center justify-center`}>
                    <span className="text-6xl">{getRankEmoji(Number(school.ranking))}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {school.school_name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {school.total_reviews} review
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                        #{school.ranking}
                      </span>
                      <span className="text-yellow-500 font-semibold flex items-center gap-1">
                        ★ {Number(school.score).toFixed(2)} / 5
                      </span>
                    </div>
                    <Link
                      href={`/user/school-detail/${school.school_id}`}
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
            <Link
              href="/user/all-rankings"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1"
            >
              Lihat Semua Ranking →
            </Link>
          </div>
        </div>
      </div>

      {/* Reviewer Section */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Reviewer Website
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Para reviewer profesional yang melakukan penilaian website sekolah
          </p>

          {/* Loading */}
          {reviewerLoading && (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Empty */}
          {!reviewerLoading && reviewers.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-lg">Belum ada data reviewer</p>
            </div>
          )}

          {/* Reviewer Cards */}
          {!reviewerLoading && displayedReviewers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
              {displayedReviewers.map((reviewer) => (
                <div
                  key={reviewer.id}
                  className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition"
                >
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {reviewer.nama_lengkap}
                  </h3>
                  {reviewer.profesi && (
                    <p className="text-sm text-gray-600 mb-1">
                      {reviewer.profesi}
                    </p>
                  )}
                  {reviewer.pendidikan_terakhir && (
                    <p className="text-xs text-gray-400">
                      {reviewer.pendidikan_terakhir}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Link Lihat Semua Reviewer */}
          {reviewers.length > 3 && (
            <div className="text-center">
              <Link
                href="/user/all-reviewers"
                className="text-blue-600 hover:text-blue-800 font-semibold text-base inline-flex items-center gap-2"
              >
                Lihat Semua Reviewer →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
