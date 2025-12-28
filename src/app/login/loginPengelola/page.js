'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';n

export default function LoginPengelola() {
  const router = useRouter();
  const [npsn, setNpsn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // mencegah reload halaman (loadingnya ga keliatan)
  const handleLogin = async (e) => {
        e.preventDefault(); 

    try {
      const username = npsn;
      // 1. Kirim request ke API route
      const response = await fetch("/api/loginpengelola", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
   
      // 2. Parse response
      const data = await response.json();
      // 3. Cek apakah login gagal?
      if (!data.success) {
        setError(data.message || 'Login failed. Please try again.');
        return;
      }
      
      // Redirect ke dashboard jika sukses
      router.push('/pengelola-sekolah');

    } catch (err) {
      setError('Username atau Password salah.');
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

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login Pengelola Sekolah</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* NPSN Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="NPSN Sekolah"
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg mb-4"
            >
              Login
            </button>

            {/* Lupa Password Link */}
            <div className="text-center">
              <Link href="/lupa-password" className="text-blue-600 hover:text-blue-700 text-sm">
                Lupa password ?
              </Link>
            </div>
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