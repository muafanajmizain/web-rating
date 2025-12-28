// src/app/Reviewer/data-sekolah/detail/[id]/page.js

'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ Untuk redirect

export default function SchoolRatingPage({ params }) {
  const { id } = use(params);
  const router = useRouter(); // ✅ Inisialisasi router

  const [schoolData, setSchoolData] = useState({
    name: "SMA Negeri 1 Purwokerto",
    managerName: "Guz Namz Zan Al-Musta",
    reviewDate: "2025-11-08",
    website: "https://website-sekolah-project.vercel.app/visi_misi.html"
  });

  const [ratings, setRatings] = useState([
    {
      no: 1,
      domain: "Web Mudah Diakses",
      description: "Web dapat diakses dengan lancar menggunakan nama domain tanpa perlu ditambahkan www/ download.",
      rating: 1.5,
      reason: "",
      link: ""
    },
    {
      no: 2,
      domain: "Domain Valid",
      description: "Domain terdaftar secara resmi dan tidak expired. Bisa dicek melalui WHOIS atau status domain.",
      rating: 1.5,
      reason: "",
      link: ""
    },
    {
      no: 3,
      domain: "Konten Visi & Misi",
      description: "Website menampilkan visi, misi, dan tujuan sekolah secara lengkap dan jelas.",
      rating: 1.5,
      reason: "",
      link: ""
    },
    {
      no: 4,
      domain: "Konten Profil Sekolah",
      description: "Harus mencakup sejarah, struktur organisasi, dan data sekolah lainnya.",
      rating: 1.5,
      reason: "",
      link: ""
    },
    {
      no: 5,
      domain: "Kontak dan Informasi",
      description: "Harus menyediakan informasi kontak yang jelas dan responsif.",
      rating: 1.5,
      reason: "",
      link: ""
    }
  ]);

  const [conclusion, setConclusion] = useState('');
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = (index, field, value) => {
    const newRatings = [...ratings];
    if (field === 'rating') {
      let numValue = parseFloat(value);
      if (isNaN(numValue)) return;
      numValue = Math.max(0, Math.min(5, numValue));
      numValue = Math.round(numValue * 2) / 2;
      newRatings[index].rating = numValue;
    } else {
      newRatings[index][field] = value;
    }
    setRatings(newRatings);

    const errorKey = `${field}-${index}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const handleDateChange = (e) => {
    setSchoolData(prev => ({
      ...prev,
      reviewDate: e.target.value
    }));
  };

  const handleConclusionChange = (value) => {
    setConclusion(value);
    if (errors.conclusion) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.conclusion;
        return newErrors;
      });
    }
  };

  const validateAndSubmit = () => {
    const newErrors = {};

    ratings.forEach((item, index) => {
      if (item.reason.trim() === '') {
        newErrors[`reason-${index}`] = 'Alasan wajib diisi';
      }
      if (item.rating < 3 && item.link.trim() === '') {
        newErrors[`link-${index}`] = 'Link bukti wajib diisi karena skor < 3';
      }
    });

    if (conclusion.trim() === '') {
      newErrors.conclusion = 'Kesimpulan penilaian harus diisi';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    console.log('Data submitted:', { ratings, conclusion, schoolId: id });
    // ✅ Langsung redirect ke daftar sekolah — tanpa popup sukses
    router.push('/Reviewer/data-sekolah');
  };

  const closeModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="p-8 flex-1 overflow-auto relative">
      <h2 className="text-3xl font-bold mb-6">Penilaian</h2>

      {/* School Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Nama Pengelola</label>
            <p className="mt-2 text-gray-900 font-medium">{schoolData.managerName}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Nama Sekolah</label>
            <p className="mt-2 text-gray-900 font-medium">{schoolData.name}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Tanggal Penilaian</label>
            <input
              type="date"
              value={schoolData.reviewDate}
              onChange={handleDateChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">Website Sekolah yang Dinilai</label>
            <a
              href={schoolData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sky-600 hover:text-sky-700 hover:underline text-sm font-medium break-all"
            >
              {schoolData.website}
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
              {ratings.map((item, index) => (
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
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="5"
                      value={item.rating}
                      onChange={(e) => handleInputChange(index, 'rating', e.target.value)}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      rows="2"
                      value={item.reason}
                      onChange={(e) => handleInputChange(index, 'reason', e.target.value)}
                      placeholder="Masukkan alasan..."
                      className={`w-full border ${errors[`reason-${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    />
                    {errors[`reason-${index}`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`reason-${index}`]}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      rows="2"
                      value={item.link}
                      onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                      placeholder="Masukkan link bukti..."
                      className={`w-full border ${errors[`link-${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    />
                    {errors[`link-${index}`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`link-${index}`]}</p>
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
        <textarea
          rows="6"
          value={conclusion}
          onChange={(e) => handleConclusionChange(e.target.value)}
          placeholder="Masukkan kesimpulan penilaian..."
          className={`w-full border ${errors.conclusion ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
        />
        {errors.conclusion && (
          <p className="mt-2 text-sm text-red-600">{errors.conclusion}</p>
        )}
      </div>

      {/* Action Buttons — HANYA TOMBOL KIRIM */}
      <div className="flex justify-end gap-3">
        <button
          onClick={validateAndSubmit}
          className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          Kirim
        </button>
      </div>

      {/* ✅ POPUP KONFIRMASI — TANPA BACKGROUND GELAP */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Konfirmasi Pengiriman</h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin mengirim penilaian ini?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Tidak
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
