"use client";

import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <>
      {/* Hero Section - Simple Gray Background */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-0 pb-32 bg-gray-100">
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            TEMUKAN SEKOLAH TERBAIK DI DAERAHMU!
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-10 max-w-3xl mx-auto">
            Platform rating sekolah terpercaya untuk membantu Anda menemukan
            sekolah terbaik.
          </p>

          {/* Button Biru Solid */}
          <Link
            href="/user/all-rankings"
            className="inline-block border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-lg font-semibold text-base 
             hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Lihat Ranking Sekolah
          </Link>
        </div>
      </section>

      {/* Top Ranking Section - Full Screen */}
      <div className="min-h-screen bg-white flex flex-col justify-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Top Ranking Website Sekolah
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - SMK Negeri 1 Purwokerto */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <Image
                  src="/images/SMA1pwt.PNG"
                  alt="Logo SMK Negeri 1 Purwokerto"
                  width={200}
                  height={200}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  SMK Negeri 1 Purwokerto
                </h3>
                <p className="text-sm text-gray-600 mb-3">Kab. Banyumas</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                    #1
                  </span>
                  <span className="text-yellow-500 font-semibold flex items-center gap-1">
                    ★ 4.9 / 5
                  </span>
                </div>
                <Link
                  href="/user/school-detail"
                  className="block w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium hover:bg-blue-700 text-center transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>

            {/* Card 2 - SMA Negeri 2 Purwokerto */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <Image
                  src="/images/sma2.PNG"
                  alt="Logo SMA Negeri 2 Purwokerto"
                  width={200}
                  height={200}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  SMA Negeri 2 Purwokerto
                </h3>
                <p className="text-sm text-gray-600 mb-3">Kab. Banyumas</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                    #2
                  </span>
                  <span className="text-yellow-500 font-semibold flex items-center gap-1">
                    ★ 4.8 / 5
                  </span>
                </div>
                <Link
                  href="/user/school-detail"
                  className="block w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium hover:bg-blue-700 text-center transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <Image
                  src="/images/smp3.PNG"
                  alt="Logo SMP Negeri 3 Purwokerto"
                  width={200}
                  height={200}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  SMP Negeri 3 Purwokerto
                </h3>
                <p className="text-sm text-gray-600 mb-3">Kab. Banyumas</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                    #3
                  </span>
                  <span className="text-yellow-500 font-semibold flex items-center gap-1">
                    ★ 4.7 / 5
                  </span>
                </div>
                <Link
                  href="/user/school-detail"
                  className="block w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium hover:bg-blue-700 text-center transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </div>

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

      {/* Reviewer Section - Card Style with Quotes */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Reviewer Website
          </h2>

          {/* Grid 3 Kolom dengan Card Putih */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
            {/* Card Reviewer 1 */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Fathan Gufron Amrani
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Mahasiswa Informatika
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                "Website ini sangat membantu saya..."
              </p>
            </div>

            {/* Card Reviewer 2 */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Fathan Gufron Amrani
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Mahasiswa Informatika
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                "Desainnya bersih dan mudah digunakan."
              </p>
            </div>

            {/* Card Reviewer 3 */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Fathan Gufron Amrani
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Mahasiswa Informatika
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                "Informasi sekolah sangat lengkap..."
              </p>
            </div>
          </div>

          {/* Link Lihat Semua Reviewer */}
          <div className="text-center">
            <Link
              href="/user/all-reviewers"
              className="text-blue-600 hover:text-blue-800 font-semibold text-base inline-flex items-center gap-2"
            >
              Lihat Semua Reviewer →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}