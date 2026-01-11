// src/app/Reviewer/data-sekolah/detail/[id]/page.js

'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';

export default function SchoolDetailPage({ params }) {
  const { id } = use(params);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchool = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login.');
        }

        const res = await fetch(`/api/schools/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Gagal memuat detail: ${res.status}`);
        }

        const data = await res.json();
        setSchool(data);
      } catch (err) {
        console.error('Error fetching school detail:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
        <span className="text-gray-600">Memuat detail sekolah...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-3xl">
          <h3 className="text-red-800 font-bold mb-2">Gagal Memuat Detail Sekolah</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:underline"
          >
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="p-8">
        <p>Sekolah tidak ditemukan.</p>
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline mt-4"
        >
          ← Kembali
        </button>
      </div>
    );
  }

  // Dummy data untuk bagian yang belum tersedia di API
  const dummyData = {
    sambutan:
      "Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memanjatkan puji syukur ke hadirat Allah SWT, saya sampaikan selamat datang di website resmi SMAN 1 Purwokerto menjadi sekolah terdepan bagi seluruh pemangku kepentingan, orang tua, alumni, masa sekarang, dan masyarakat luas. Sekolah ini merupakan lembaga pendidikan yang berkomitmen untuk menghasilkan lulusan yang berkarakter, unggul, berwawasan global, serta penuh kejujuran. Melalui berbagai program inovatif yang tersedia bagi sekolah dan masyarakat luas, SMAN 1 Purwokerto berkomitmen menjadi pusat keunggulan pembelajaran akademik. Semoga informasi yang tersedia dapat bermanfaat dan menginspirasi semua pihak dalam mendukung kemajuan pendidikan kita bersama. Wassalamu'alaikum Warahmatullahi Wabarakatuh.",
    jurusan: ["Ilmu Pengetahuan Alam", "Ilmu Pengetahuan Sosial", "Bahasa dan Budaya", "Keagamaan"],
    prestasi: [
      { nama: "Infinity", kelas: "XI MIPA 1", kategori: "Solin Soccer" },
      { nama: "Infinity", kelas: "XI MIPA 1", kategori: "Olimpiade Sains" },
      { nama: "Infinity", kelas: "XI MIPA 1", kategori: "Lomba Debat" },
    ],
    berita: [
      { judul: "Siswa SMAN 1 Purwokerto Raih Medali Emas Olimpiade Sains", tanggal: "15 September 2025" },
      { judul: "Kunjungan Industri ke Perusahaan Teknologi Jakarta", tanggal: "10 September 2025" },
    ],
    ekstrakurikuler: ["Seni dan Budaya", "Olahraga", "Paskibra", "Karya Ilmiah Remaja", "Pramuka"],
    visi: "Membentuk Insan Yang Bertaqwa, Unggul, Inovatif Nasionalisme Dan Wirausaha, Peduli Lingkungan, Serta Kompeten Dibidangnya.",
    misi: [
      "Membentuk Insan yang Bertaqwa Dan Berakhlak Mulia",
      "Membentuk Peserta Didik yang Unggul dalam Prestasi dan IPTEK",
      "Memiliki Rasa Nasionalisme dan Cinta Tanah Air",
      "Menyiapkan Peserta Didik yang Mampu Berpikir Cerdas, Berwawasan Luas, Terampil, Mandiri, Kreatif, dan Inovatif"
    ]
  };

  return (
    <div className="p-8 flex-1 overflow-auto">
      <h2 className="text-3xl font-bold mb-6">Detail Sekolah</h2>

      {/* School Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-2xl font-bold mb-2">{school.nama}</h3>
        <div className="mb-3">
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold">
            {school.jenjang || 'SMA'}
          </span>
        </div>
        {school.website ? (
          <a
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {school.website}
          </a>
        ) : (
          <p className="text-sm text-gray-500">Website tidak tersedia</p>
        )}
      </div>

      {/* Sambutan */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h4 className="text-xl font-bold mb-3">Sambutan Kepala Sekolah</h4>
        <p className="text-gray-800 whitespace-pre-line">{dummyData.sambutan}</p>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-3">Visi</h4>
          <p className="text-gray-800">"{dummyData.visi}"</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-3">Misi</h4>
          <ul className="list-disc pl-5 text-gray-800 space-y-1">
            {dummyData.misi.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Jurusan */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h4 className="text-xl font-bold mb-4">Jurusan dan Keahlian</h4>
        <div className="flex flex-wrap gap-2">
          {dummyData.jurusan.map((jurusan, i) => (
            <span
              key={i}
              className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {jurusan}
            </span>
          ))}
        </div>
      </div>

      {/* Prestasi */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h4 className="text-xl font-bold mb-4">Prestasi Siswa</h4>
        <div className="space-y-3">
          {dummyData.prestasi.map((prestasi, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">{prestasi.nama}</p>
              <p className="text-sm text-gray-600">Kelas: {prestasi.kelas}</p>
              <p className="text-sm">Kategori: {prestasi.kategori}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Berita Terbaru */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h4 className="text-xl font-bold mb-4">Berita Terbaru</h4>
        <div className="space-y-3">
          {dummyData.berita.map((berita, i) => (
            <div key={i} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <h5 className="font-bold">{berita.judul}</h5>
              <p className="text-sm text-gray-600">{berita.tanggal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ekstrakurikuler */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-xl font-bold mb-4">Ekstrakurikuler</h4>
        <div className="flex flex-wrap gap-2">
          {dummyData.ekstrakurikuler.map((ekskul, i) => (
            <span
              key={i}
              className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {ekskul}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}