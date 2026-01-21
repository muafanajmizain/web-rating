"use client";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header dengan decorative elements */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative">
            Tentang Kami
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Konten Utama dengan Grid Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri - Deskripsi Sistem */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Apa Itu Sistem Rating Sekolah?</h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
                Sistem Rating Sekolah adalah platform digital yang dirancang untuk
                memberikan gambaran objektif mengenai kualitas sekolah di Indonesia
                berdasarkan penilaian dari reviewer terverifikasi. Melalui sistem
                ini, masyarakat dapat membuat perbandingan mutu antar sekolah
                berdasarkan aspek seperti fasilitas, prestasi, kegiatan, serta
                kualitas pengajaran.
              </p>
            </div>

            {/* Bagaimana Sistem Bekerja */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Bagaimana Sistem Ini Bekerja?</h2>
              </div>
              <div className="space-y-4">
                {[
                  { no: "01", text: "Website Sekolah didaftarkan oleh Admin untuk diklaim oleh Pengelola sekolah terkait." },
                  { no: "02", text: "Pengelola sekolah melengkapi data sekolah miliknya yang telah didaftarkan admin." },
                  { no: "03", text: "Data yang sudah lengkap akan di Review dan diberi rating oleh Reviewer yang terverivikasi." },
                  { no: "04", text: "Pengelola sekolah dapat memberi tanggapan atas pembuatan data, lalu dilakukan review ulang jika diperlukan." },
                  { no: "05", text: "Hasil rating ditampilkan di halaman user publik agar dapat diakses semua orang." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-200">
                      {item.no}
                    </div>
                    <p className="text-gray-700 pt-2 flex-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Tujuan Kami */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Tujuan Kami</h2>
              </div>
              <div className="space-y-5">
                {[
                  "Meningkatkan transparansi informasi pendidikan, agar masyarakat dapat memilih sekolah dengan pertimbangan yang lebih matang.",
                  "Mendorong sekolah untuk terus berbenah, dengan memperhatikan hasil review dan tanggapan profesional.",
                  "Membangun ekosistem penilaian yang adil dan terpercaya, tanpa dipengaruhi oleh kepentingan pihak tertentu.",
                  "Mendukung pemerintah dan lembaga pendidikan, dalam memetakan kualitas sekolah di berbagai wilayah."
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5 backdrop-blur-sm">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-white/95 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              
              {/* Stats/Info Cards */}
              <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-sm text-white/80">Transparan</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/80">Akses Data</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}