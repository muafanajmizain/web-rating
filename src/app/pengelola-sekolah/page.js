// src/app/pengelola-sekolah/page.js

"use client";
import { useDashboardSummary } from "@/hooks/useSWR";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "./DashboardLayout";

export default function PengelolaDashboard() {
  const [notificationCount] = useState(3);
  const router = useRouter();

  const {
    summary,
    isLoading: loading,
    isError: error,
    mutate,
  } = useDashboardSummary();

  const handleNotification = () => {
    router.push("/pengelola-sekolah/riwayat");
  };

  // Get data from summary
  const averageScore = summary?.rating?.average_score || 0;
  const reviewCount = summary?.rating?.review_count || 0;
  const rankingKecamatan = summary?.ranking_kecamatan || "-";
  const rankingKabupaten = summary?.ranking_kabupaten || "-";
  const reviewerCount = summary?.reviewer_count || 0;
  const reviews = summary?.reviews || [];

  // Check if error is "school not found"
  const isSchoolNotFound = error?.message?.toLowerCase().includes("school not found");

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <DashboardLayout title="Pengelola Web Sekolah">
      {/* Welcome & Notification */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-700">
          Selamat datang di halaman utama, pengelola web sekolah
        </p>

        <button
          onClick={handleNotification}
          className="relative p-2 hover:bg-white hover:shadow-sm rounded-lg transition duration-200"
          title="Notifikasi"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      {/* No School Warning Banner */}
      {isSchoolNotFound && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                Sekolah Belum Diklaim
              </h3>
              <p className="text-sm text-yellow-700 mb-3">
                Akun Anda belum terhubung dengan sekolah. Silakan klaim sekolah Anda terlebih dahulu untuk mengakses dashboard.
              </p>
              <Link
                href="/pengelola-sekolah/profile"
                className="inline-flex items-center gap-2 text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Klaim Sekolah di Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Rating Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Card 1 - Rating */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Rating</h3>
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : error || !summary ? (
            <p className="text-sm text-gray-400">-</p>
          ) : (
            <>
              <div className="flex justify-center gap-1 mb-2">
                {renderStars(averageScore)}
              </div>
              <p className="text-xs text-gray-500">
                {averageScore.toFixed(1)} dari {reviewCount} review
              </p>
            </>
          )}
        </div>

        {/* Card 2 - Ranking Kecamatan */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Ranking Kecamatan
          </h3>
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : error || !summary ? (
            <p className="text-3xl font-bold text-gray-400">-</p>
          ) : (
            <p className="text-3xl font-bold text-gray-800">{rankingKecamatan}</p>
          )}
        </div>

        {/* Card 3 - Ranking Kabupaten */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Ranking Kabupaten
          </h3>
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : error || !summary ? (
            <p className="text-3xl font-bold text-gray-400">-</p>
          ) : (
            <p className="text-3xl font-bold text-gray-800">{rankingKabupaten}</p>
          )}
        </div>

        {/* Card 4 - Reviewer */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Reviewer</h3>
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : error || !summary ? (
            <p className="text-3xl font-bold text-gray-400">-</p>
          ) : (
            <p className="text-3xl font-bold text-gray-800">{reviewerCount}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Website Preview */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="relative h-80">
            <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-600">
                  www.sman1purwokerto.sch.id
                </span>
              </div>
            </div>

            <div className="w-full h-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center">
              <div className="text-center text-white px-8">
                <h1 className="text-4xl font-bold mb-2">
                  SMA NEGERI 1 PURWOKERTO
                </h1>
                <p className="text-sm opacity-90">
                  Jl. Jend. Sudirman No.1, Purwokerto
                </p>
                <p className="text-sm opacity-90">www.sman1purwokerto.sch.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Review List */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Review Data</h3>
            {!loading && !error && (
              <button
                onClick={() => mutate()}
                className="text-sm text-blue-600 hover:text-blue-700"
                title="Refresh data"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500">Memuat data review...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center">
              {isSchoolNotFound ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <svg
                    className="w-12 h-12 text-yellow-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <p className="text-sm text-yellow-700 mb-3">
                    Belum ada review karena sekolah belum diklaim.
                  </p>
                  <Link
                    href="/pengelola-sekolah/profile"
                    className="inline-block text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Klaim Sekolah
                  </Link>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <svg
                    className="w-10 h-10 text-red-400 mx-auto mb-3"
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
                  <p className="text-sm text-red-600 mb-3">
                    {error?.message || "Gagal mengambil data review"}
                  </p>
                  <button
                    onClick={() => mutate()}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Review List */}
          {!loading && !error && (
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {reviews.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-sm">Belum ada review</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {review.reviewer_name || "Reviewer"}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(review.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">
                              {review.total_score.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({review.items_count} item{review.items_count !== 1 ? 's' : ''})
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/pengelola-sekolah/review-tanggapan?reviewId=${review.id}`}
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1 inline-block"
                        >
                          Lihat Detail...
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
