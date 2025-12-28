// src/app/User/about/page.js
'use client'
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Tentang Kami</h1>
      </div>

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        
        {/* Deskripsi Sistem */}
        <div className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Sistem Rating Sekolah adalah platform digital yang dirancang untuk memberikan gambaran objektif mengenai kualitas sekolah di Indonesia berdasarkan penilaian dari reviewer terverifikasi. Melalui sistem ini, masyarakat dapat membuat perbandingan mutu antar sekolah berdasarkan aspek seperti aspek fasilitas, prestasi, kegiatan, serta kualitas pengajaran.
          </p>
        </div>

        {/* Tujuan Kami */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tujuan Kami</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Meningkatkan transparansi informasi pendidikan, agar masyarakat dapat memilih sekolah dengan pertimbangan yang lebih matang.</li>
            <li>Mendorong sekolah untuk terus berbenah, dengan memperhatikan hasil review dan tanggapan profesional.</li>
            <li>Membangun ekosistem penilaian yang adil dan terpercaya, tanpa dipengaruhi oleh kepentingan pihak tertentu.</li>
            <li>Mendukung pemerintah dan lembaga pendidikan, dalam memetakan kualitas sekolah di berbagai wilayah.</li>
          </ol>
        </div>

        {/* Bagaimana Sistem Ini Bekerja? */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bagaimana Sistem Ini Bekerja?</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Sekolah didaftarkan oleh admin atau pengelola sekolah.</li>
            <li>Reviewer memberikan penilaian resmi terhadap beberapa aspek sekolah seperti fasilitas, prestasi, dan pengajaran.</li>
            <li>Hasil rating ditampilkan di halaman publik agar dapat diakses semua orang.</li>
            <li>Pengelola sekolah dapat memberi tanggapan atas pembuatan data, lalu dilakukan review ulang jika diperlukan.</li>
            <li>Admin memantau seluruh aktivitas dan menghasilkan laporan perkembangan kualitas sekolah.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}