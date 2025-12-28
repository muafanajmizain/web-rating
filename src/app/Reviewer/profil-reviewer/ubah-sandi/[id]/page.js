// src/app/Reviewer/profil-reviewer/ubah-sandi/[id]/page.js

'use client';

import { useParams } from 'next/navigation'; // ✅ Import useParams
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const { id } = useParams(); // ✅ Gunakan useParams untuk mendapatkan ID

  // State untuk form
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi: kata sandi baru dan konfirmasi harus sama
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Kata sandi baru dan konfirmasi tidak cocok!');
      return;
    }

    // Di sini Anda bisa kirim data ke API
    console.log('Data yang disimpan:', formData);
    alert('Kata sandi berhasil diperbarui!');
  };

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      {/* Judul Halaman */}
      <h2 className="text-3xl font-bold mb-2">Ubah Kata Sandi</h2>
      <p className="text-gray-600 mb-8">Perbarui keamanan akun Anda.</p>

      {/* Kontainer Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kata Sandi Lama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kata Sandi Lama
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan kata sandi lama"
              required
            />
          </div>

          {/* Kata Sandi Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan kata sandi baru"
              required
            />
          </div>

          {/* Konfirmasi Kata Sandi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Konfirmasi kata sandi baru"
              required
            />
          </div>

          {/* Button Simpan */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
