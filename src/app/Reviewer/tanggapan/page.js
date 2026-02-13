// src/app/Reviewer/tanggapan/page.js
"use client";

import Link from "next/link";
import { useReviews } from "@/hooks/useTanggapan";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function Page() {
  const { reviews, isLoading, isError, errorMessage } = useReviews();

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Tanggapan</h2>
      <p className="text-gray-600 mb-6">
        Daftar review yang telah Anda lakukan beserta tanggapan dari pengelola.
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-500">Memuat data...</span>
        </div>
      )}

      {/* Error */}
      {isError && (
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
          <p className="text-red-600 mb-2">Gagal memuat data</p>
          <p className="text-gray-500 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && reviews.length === 0 && (
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
          Belum ada review yang dilakukan.
        </div>
      )}

      {/* List */}
      {!isLoading && !isError && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Avatar based on school name */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {String(review.nama_sekolah || "S").slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">
                    {review.nama_sekolah || "-"}
                  </div>

                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Skor: {review.total_score ?? "-"}
                    </span>
                    <span className="flex items-center gap-1">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(review.tanggal)}
                    </span>
                  </div>
                </div>

                {review.school_id && (
                  <div className="flex items-center">
                    <Link
                      href={`/Reviewer/tanggapan/detail/${review.school_id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
