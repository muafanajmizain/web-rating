// src/app/Reviewer/tanggapan/page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  // Mock data tanggapan dari pengelola
  const feedbacks = [
    {
      id: 1,
      avatar: "https://placehold.co/60x60/3b82f6/ffffff?text=JP",
      name: "Joko Prasetyo",
      message: "Terima kasih atas review yang telah diberikan. Mohon penjelasan lebih lanjut mengenai poin 3 di bagian fasilitas, karena kami sudah melakukan perbaikan sesuai standar.",
      timestamp: "2025-12-18 14:30"
    },
    {
      id: 2,
      avatar: "https://placehold.co/60x60/10b981/ffffff?text=AS",
      name: "Anisa Sari",
      message: "Kami sangat menghargai masukan Anda. Untuk poin akademik, kami ingin meminta izin untuk mengunggah dokumen pendukung terkait prestasi siswa tahun ini.",
      timestamp: "2025-12-17 09:15"
    },
    {
      id: 3,
      avatar: "https://placehold.co/60x60/f59e0b/ffffff?text=BD",
      name: "Budi Darmawan",
      message: "Mohon maaf atas keterlambatan respon. Kami sedang melakukan evaluasi internal terhadap review Anda dan akan memberikan update dalam waktu 2x24 jam.",
      timestamp: "2025-12-16 18:45"
    },
    {
      id: 4,
      avatar: "https://placehold.co/60x60/8b5cf6/ffffff?text=RS",
      name: "Rina Susanti",
      message: "Review Anda sangat membantu. Kami akan segera memperbaiki konten website sesuai saran Anda, terutama pada bagian galeri kegiatan.",
      timestamp: "2025-12-15 11:20"
    }
  ];

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      {/* Judul Halaman */}
      <h2 className="text-3xl font-bold mb-6">Tanggapan</h2>
      <p className="text-gray-600 mb-6">Memuat daftar tanggapan dari pengelola website sekolah.</p>

      {/* Daftar Tanggapan */}
      <div className="space-y-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Avatar & Nama */}
              <div className="flex-shrink-0">
                <img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                {/* Nama Pengelola */}
                <div className="font-semibold text-gray-800">{fb.name}</div>
                {/* Preview Pesan */}
                <div className="mt-2 text-gray-700 line-clamp-2">
                  {fb.message}
                </div>
                {/* Timestamp */}
                <div className="mt-2 text-xs text-gray-500">{fb.timestamp}</div>
              </div>
              {/* Button Detail - DIPOSISIKAN DI TENGAH VERTIKAL */}
              <div className="flex items-center">
                <Link
                  href={`/Reviewer/tanggapan/detail/${fb.id}`} // ✅ Rute diperbarui
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jika tidak ada data */}
      {feedbacks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Belum ada tanggapan dari pengelola.
        </div>
      )}
    </div>
  );
}
