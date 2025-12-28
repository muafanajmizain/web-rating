'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginReviewer() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
  e.preventDefault();
  
  if (email === 'reviewer@example.com' && password === 'reviewer123') {
    // Simpan session
    localStorage.setItem('role', 'reviewer');
    localStorage.setItem('email', email);
    
    // Langsung redirect
    router.push('/Reviewer');
  } else {
    setError('Email atau password salah!');
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
            KONTRIBUSI ANDA BERARTI UNTUK<br />PENINGKATAN MUTU DIGITAL SEKOLAH
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login Riviewer</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Login
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