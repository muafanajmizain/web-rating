// src/app/Reviewer/profil-reviewer/edit/page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  // Mock data profil reviewer (biasanya diambil dari state atau API)
  const [profile, setProfile] = useState({
    name: "Guz Nazmi Al-Mu'afa",
    email: "guznazmi@example.com",
    whatsapp: "089101112131415",
    avatar: "https://placehold.co/120x120/3b82f6/ffffff?text=GN"
  });

  // State untuk form
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    whatsapp: profile.whatsapp
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini Anda bisa kirim data ke API
    console.log('Data yang disimpan:', formData);
    alert('Profil berhasil diperbarui!');
    // Setelah simpan, Anda bisa redirect atau update state
  };

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      {/* Judul Halaman */}
      <h2 className="text-3xl font-bold mb-2">Ubah Profil</h2>
      <p className="text-gray-600 mb-8">Perbarui informasi akun Anda.</p>

      {/* Kontainer Utama Edit Profil */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto w-full">
        {/* Foto Profil & Upload Button */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={profile.avatar}
            alt="Foto Profil"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
            Upload Gambar
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No WhatsApp
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nomor WhatsApp"
              />
            </div>
          </div>

          {/* Button Simpan */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
