// src/app/Reviewer/data-sekolah/detail/[id]/page.js
"use client";

import { use } from "react";
import Link from "next/link";
import { useSchoolDetailLocal } from "@/hooks/useSWR";
import { useReviewsBySchool } from "@/hooks/useTanggapan";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function SchoolDetailPage({ params }) {
  const { id: schoolId } = use(params);

  // Fetch school data
  const {
    school,
    isLoading: schoolLoading,
    isError: schoolError,
  } = useSchoolDetailLocal(schoolId);

  // Fetch reviews for this school
  const {
    reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useReviewsBySchool(schoolId);

  const isLoading = schoolLoading || reviewsLoading;

  if (isLoading) {
    return (
      <div className="p-8 flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (schoolError) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Gagal memuat data sekolah</p>
          <Link
            href="/Reviewer/data-sekolah"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 font-medium">Sekolah tidak ditemukan</p>
          <Link
            href="/Reviewer/data-sekolah"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex-1 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Detail Sekolah</h2>
        <Link
          href="/Reviewer/data-sekolah"
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </Link>
      </div>

      {/* School Info Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {String(school.nama || "S").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{school.nama}</h3>
              <p className="text-blue-100 mt-1">{school.jenjang || "Sekolah"}</p>
            </div>
          </div>
        </div>

        {/* School Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">NPSN</label>
              <p className="mt-1 text-gray-900 font-medium">{school.npsn || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="mt-1 text-gray-900 font-medium">{school.status || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Alamat</label>
              <p className="mt-1 text-gray-900">{school.alamat || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Website</label>
              {school.website ? (
                <a
                  href={school.website.startsWith("http") ? school.website : `https://${school.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-blue-600 hover:underline break-all"
                >
                  {school.website}
                </a>
              ) : (
                <p className="mt-1 text-gray-500">Tidak tersedia</p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-6 border-t">
            <Link
              href={`/Reviewer/data-sekolah/nilai/${schoolId}`}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Beri Penilaian
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Riwayat Review</h3>
          <p className="text-sm text-gray-600">Daftar review yang telah dilakukan untuk sekolah ini</p>
        </div>

        <div className="p-6">
          {reviewsError ? (
            <div className="text-center py-8 text-red-600">
              <p>Gagal memuat data review</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
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
              <p>Belum ada review untuk sekolah ini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {String(review.nama_reviewer || "R").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {review.nama_reviewer || "Reviewer"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(review.tanggal_review)}
                        </p>
                      </div>
                    </div>
                    {review.total_score !== undefined && (
                      <div className="text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          Skor: {review.total_score}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
