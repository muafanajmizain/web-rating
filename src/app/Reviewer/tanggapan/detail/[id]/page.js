// src/app/Reviewer/tanggapan/detail/[id]/page.js

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  const { id } = useParams();

  // Mock data detail tanggapan berdasarkan ID
  const feedbackData = {
    id: parseInt(id) || 1,
    schoolName: "SMA Negeri 1 Sirampog",
    managerName: "Guz Pixmen Leonard",
    website: "https://website-sekolah-project.vercel.app/visi_misi.html",
    avatar: "https://placehold.co/80x80/3b82f6/ffffff?text=GP",
    messages: [
      {
        text: "Terima kasih atas review yang telah diberikan. Mohon penjelasan lebih lanjut mengenai aspek 'Kelengkapan Informasi Sekolah' agar kami dapat melakukan perbaikan yang sesuai.",
        timestamp: "15:03",
        sender: "pengelola"
      },
      {
        text: "Website saya sudah update, silahkan review ulang",
        timestamp: "15:03",
        sender: "reviewer"
      }
    ]
  };

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      {/* Judul Halaman */}
      <h2 className="text-3xl font-bold mb-2">Detail Tanggapan</h2>
      <p className="text-gray-600 mb-8">Percakapan dengan pengelola sekolah.</p>

      {/* Kontainer Utama */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto w-full">
        {/* Header: Foto & Info Sekolah */}
        <div className="flex items-start gap-6 mb-8 border-b pb-6">
          <img
            src={feedbackData.avatar}
            alt="Foto Pengelola"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
          />
          <div className="flex-1 min-w-0">
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-4">
                <span className="font-semibold w-40">Nama Sekolah</span>
                <span className="flex-1">: {feedbackData.schoolName}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold w-40">Nama Pengelola</span>
                <span className="flex-1">: {feedbackData.managerName}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold w-40">Website Sekolah yang Dinilai</span>
                <span className="flex-1">
                  : <a href={feedbackData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {feedbackData.website}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Percakapan */}
        <div className="space-y-4">
          {/* Label Hari Ini */}
          <div className="flex justify-center">
            <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-medium">
              Hari ini
            </span>
          </div>

          {/* Daftar Pesan */}
          {feedbackData.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-[80%] ${
                msg.sender === 'pengelola'
                  ? 'bg-gray-100 ml-auto'
                  : 'bg-blue-50 mr-auto'
              }`}
            >
              <div className="text-gray-800 whitespace-pre-wrap">{msg.text}</div>
              <div className="text-xs text-gray-500 mt-2 text-right">{msg.timestamp}</div>
            </div>
          ))}
        </div>

        {/* Button Kembali - DIPERBARUI DENGAN IKON DAN WARNA LEBIH SESUAI */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/Reviewer/tanggapan"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            {/* Ikon Panah Kiri */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Kembali ke Daftar Tanggapan
          </Link>
        </div>
      </div>
    </div>
  );
}
