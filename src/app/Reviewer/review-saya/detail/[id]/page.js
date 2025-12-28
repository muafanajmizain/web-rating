// src/app/Reviewer/review-saya/detail/[id]/page.js

'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  // Mock data — ganti dengan API call sesuai kebutuhan
  const initialData = {
    schoolName: "SMA Negeri 1 Purwokerto",
    managerName: "Guz Namz Zan Al-Musta",
    reviewDate: "2025-11-08",
    website: "https://website-sekolah-project.vercel.app/visi_misi.html",
    conclusion: "Website sekolah sudah cukup baik, namun perlu peningkatan pada bagian konten akademik dan visi misi.",
    ratings: [
      {
        no: 1,
        domain: "Web Mudah Diakses",
        description: "Web dapat diakses dengan lancar menggunakan nama domain tanpa perlu ditambahkan www/ download.",
        rating: 4.5,
        reason: "Website dapat diakses dengan cepat dan responsif di berbagai perangkat.",
        link: "https://website-sekolah-project.vercel.app/"
      },
      {
        no: 2,
        domain: "Domain Valid",
        description: "Domain terdaftar secara resmi dan tidak expired. Bisa dicek melalui WHOIS atau status domain.",
        rating: 5,
        reason: "Domain aktif dan terdaftar hingga 2027.",
        link: "https://whois.domaintools.com/website-sekolah-project.vercel.app"
      },
      {
        no: 3,
        domain: "Konten Visi & Misi",
        description: "Website menampilkan visi, misi, dan tujuan sekolah secara lengkap dan jelas.",
        rating: 3,
        reason: "Visi dan misi sudah ada, tetapi tidak dijelaskan secara mendalam.",
        link: "https://website-sekolah-project.vercel.app/visi_misi.html"
      },
      {
        no: 4,
        domain: "Konten Profil Sekolah",
        description: "Harus mencakup sejarah, struktur organisasi, dan data sekolah lainnya.",
        rating: 4,
        reason: "Profil sekolah sudah lengkap, namun struktur organisasi kurang jelas.",
        link: ""
      },
      {
        no: 5,
        domain: "Kontak dan Informasi",
        description: "Harus menyediakan informasi kontak yang jelas dan responsif.",
        rating: 4.5,
        reason: "Ada email dan nomor telepon, tapi tidak ada form kontak.",
        link: ""
      }
    ]
  };

  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (index, field, value) => {
    if (!isEditing) return;
    const newRatings = [...data.ratings];
    if (field === 'rating') {
      let numValue = parseFloat(value);
      if (isNaN(numValue)) return;
      numValue = Math.max(0, Math.min(5, numValue));
      numValue = Math.round(numValue * 2) / 2;
      newRatings[index].rating = numValue;
    } else {
      newRatings[index][field] = value;
    }
    setData(prev => ({ ...prev, ratings: newRatings }));
  };

  const handleConclusionChange = (value) => {
    if (!isEditing) return;
    setData(prev => ({ ...prev, conclusion: value }));
  };

  const handleDateChange = (e) => {
    if (!isEditing) return;
    setData(prev => ({ ...prev, reviewDate: e.target.value }));
  };

  const validateData = () => {
    const errors = [];
    data.ratings.forEach((item, index) => {
      if (!item.reason.trim()) {
        errors.push(`Poin ${item.no}: Alasan wajib diisi`);
      }
      if (item.rating < 3 && !item.link.trim()) {
        errors.push(`Poin ${item.no}: Link bukti wajib diisi karena skor < 3`);
      }
    });
    if (!data.conclusion.trim()) {
      errors.push('Kesimpulan penilaian harus diisi');
    }
    return errors;
  };

  const handleSave = () => {
    const errors = validateData();
    if (errors.length > 0) {
      alert('Mohon lengkapi data berikut:\n\n' + errors.join('\n'));
      return;
    }

    // Simpan ke backend (mock)
    console.log('Data disimpan:', data);
    setIsEditing(false);
    setShowSuccessModal(true);

    // Redirect ke daftar review setelah 1.5 detik
    setTimeout(() => {
      router.push('/Reviewer/review-saya');
    }, 1500);
  };

  return (
    <div className="p-8 flex-1 overflow-auto relative">
      <h2 className="text-3xl font-bold mb-6">Detail Review</h2>

      {/* School Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Nama Pengelola</label>
            <p className="mt-2 text-gray-900 font-medium">{data.managerName}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Nama Sekolah</label>
            <p className="mt-2 text-gray-900 font-medium">{data.schoolName}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Tanggal Penilaian</label>
            {isEditing ? (
              <input
                type="date"
                value={data.reviewDate}
                onChange={handleDateChange}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-2 text-gray-900 font-medium">{data.reviewDate}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Website Sekolah yang Dinilai</label>
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sky-600 hover:text-sky-700 hover:underline text-sm font-medium break-all"
            >
              {data.website}
            </a>
          </div>
        </div>
      </div>

      {/* Rating Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <h3 className="text-xl font-bold text-gray-800">Tabel Penilaian</h3>
          <p className="text-sm text-gray-600 mt-1">Note: Link Bukti wajib diisi ketika skor &lt; 3</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-center w-16">No</th>
                <th className="px-6 py-4 text-left">Poin Penilaian</th>
                <th className="px-6 py-4 text-center w-32">Skor</th>
                <th className="px-6 py-4 text-center w-64">Alasan</th>
                <th className="px-6 py-4 text-center w-64">Link Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.ratings.map((item, index) => (
                <tr key={item.no} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                      {item.no}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">{item.domain}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="5"
                        value={item.rating}
                        onChange={(e) => handleInputChange(index, 'rating', e.target.value)}
                        className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      />
                    ) : (
                      <span className="font-semibold">{item.rating}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <textarea
                        rows="2"
                        value={item.reason}
                        onChange={(e) => handleInputChange(index, 'reason', e.target.value)}
                        placeholder="Masukkan alasan..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    ) : (
                      <div className="text-sm">{item.reason}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <textarea
                        rows="2"
                        value={item.link}
                        onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                        placeholder="Masukkan link bukti..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    ) : (
                      item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:underline text-sm break-all"
                        >
                          {item.link}
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kesimpulan Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Kesimpulan Penilaian Review</h3>
        <p className="text-sm text-gray-600 mb-3">Tuliskan kesan umum dan rekomendasi perbaikan</p>
        {isEditing ? (
          <textarea
            rows="6"
            value={data.conclusion}
            onChange={(e) => handleConclusionChange(e.target.value)}
            placeholder="Masukkan kesimpulan penilaian..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        ) : (
          <div className="text-gray-800 whitespace-pre-line">{data.conclusion}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Simpan
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      {/* ✅ Popup Sukses — Tanpa background gelap */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Berhasil!</h3>
              <p className="text-gray-600 mb-6">Perubahan berhasil disimpan.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
