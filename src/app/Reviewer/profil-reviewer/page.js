// src/app/Reviewer/profil-reviewer/page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  // Mock data profil reviewer
  const profile = {
    id: 1,
    name: "Guz Nazmi Zain Al-mu'afa",
    email: "guznazmi@example.com",
    whatsapp: "089101112131415",
    avatar: "https://placehold.co/150x150/3b82f6/ffffff?text=GN"
  };

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
 
  const getProfile = async () => {
    try {
      const response = await fetch('/api/profilereviewer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: user.id }),
      }); 
      const data = await response.json();

      if (response.ok) {
        // console.log('Profile data:', data.data[0]);
        const profile = data.data[0];
        const alias = profile.nama_lengkap.split(' ').map(n => n[0]).join('');
        console.log('Alias:', alias);
        // Update state or perform actions with the profile data
      } else {
        console.error('Error fetching profile:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  getProfile();

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      {/* Judul Halaman */}
      <h2 className="text-3xl font-bold mb-2">Profil Anda</h2>
      <p className="text-gray-600 mb-8">Kelola informasi akun Anda di sini.</p>

      {/* Kontainer Utama Profil - Lebar penuh, responsif */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto w-full">
        {/* Foto Profil & Data */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Foto Profil dan Link Ubah Kata Sandi */}
          <div className="flex-shrink-0 text-center">
            <img
              src={profile.avatar}
              alt="Foto Profil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md mx-auto"
            />
            {/* ✅ LINK DIPERBARUI */}
            <Link
              href={`/Reviewer/profil-reviewer/ubah-sandi/${profile.id}`}
              className="mt-4 block text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              Ubah Kata Sandi
            </Link>
          </div>

          {/* Data Profil */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg w-36 text-gray-800">Nama Lengkap</span>
                <span className="flex-1 border-b border-gray-300 pb-1">: {profile.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg w-36 text-gray-800">Email</span>
                <span className="flex-1 border-b border-gray-300 pb-1">: {profile.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg w-36 text-gray-800">No WhatsApp</span>
                <span className="flex-1 border-b border-gray-300 pb-1">: {profile.whatsapp}</span>
              </div>
            </div>

            {/* Button Ubah Profil */}
            <div className="mt-8 flex justify-end">
              <Link
                href={`/Reviewer/profil-reviewer/edit-profil/${profile.id}`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4v7l16-16z"></path>
                  <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"></path>
                  <path d="M16 13H9"></path>
                </svg>
                Ubah Profil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
