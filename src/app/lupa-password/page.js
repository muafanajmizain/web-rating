// src/app/lupa-password/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LupaPassword() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi input
    if (!username) {
      setError('Username/NPSN wajib diisi');
      return;
    }
    if (!newPassword) {
      setError('Kata sandi baru wajib diisi');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok');
      return;
    }

    try {
      // 🔌 Kirim ke backend: POST /api/auth/reset-password
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // atau npsn — sesuaikan dengan endpoint Anda
          newPassword,
        }),
      });

      if (res.ok) {
        setSuccess('Kata sandi berhasil diperbarui!');
        // Redirect ke login setelah 2 detik
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const err = await res.json();
        setError(err.message || 'Gagal mereset password.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan. Cek koneksi Anda.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header Text */}
        <div className="text-center mb-8">
          <p className="text-white text-sm mb-2">Sistem Rating Web Sekolah</p>
          <h1 className="text-white text-2xl font-bold leading-tight">
            BERSAMA WUJUDKAN WEBSITE SEKOLAH<br />YANG LEBIH BAIK
          </h1>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Lupa password</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* New Password Input */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Kata Sandi Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Konfirmasi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* Simpan Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Simpan
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white text-sm">© 2025 SchoolRank. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}