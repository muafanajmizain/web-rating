// src/app/Reviewer/tanggapan/page.js
'use client';

import Link from 'next/link';
import { useTanggapan } from '@/hooks/useTanggapan';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function Page() {
  // sementara hardcode dulu sesuai contoh URL kamu
  const reviewId = '344d3ce4-1ad7-4836-8568-95b7c5aa7e0e';

  const { data: feedbacks, isLoading, isError, errorMessage } = useTanggapan(reviewId);

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Tanggapan</h2>
      <p className="text-gray-600 mb-6">
        Memuat daftar tanggapan dari pengelola website sekolah.
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="text-gray-500">Memuat tanggapan...</div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-red-600">
          Gagal memuat data: {errorMessage}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && feedbacks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Belum ada tanggapan dari pengelola.
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Avatar dummy dari username */}
              <div className="flex-shrink-0">
                <img
                  src={`https://placehold.co/60x60/3b82f6/ffffff?text=${String(
                    fb.username || 'U'
                  ).slice(0, 2)}`}
                  alt={fb.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800">{fb.username}</div>

                <div className="mt-2 text-gray-700 line-clamp-2">
                  {fb.pesan}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {formatDate(fb.created_at)}
                </div>
              </div>

              <div className="flex items-center">
                <Link
                  href={`/Reviewer/tanggapan/detail/${fb.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
