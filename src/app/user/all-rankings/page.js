// src/app/User/all-rankings/page.js
'use client'
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function AllRankingsPage() {
  const [jenjang, setJenjang] = useState('semua'); // Filter jenjang

  // Data dummy sekolah — bisa diganti dengan data dari API nanti
  const schools = [
    { id: 1, rank: 1, name: "SMKN 1 Purwokerto", website: "https://smkn1purwokerto.sch.id", rating: 4.7, image: "/images/school1.jpg", level: "SMA/SMK/MA" },
    { id: 2, rank: 2, name: "SMA Negeri 2 Purwokerto", website: "https://sman2purwokerto.sch.id", rating: 4.8, image: "/images/school2.jpg", level: "SMA/SMK/MA" },
    { id: 3, rank: 3, name: "SMP Negeri 3 Purwokerto", website: "https://smpn3purwokerto.sch.id", rating: 4.6, image: "/images/school3.jpg", level: "SMP/MTS" },
    { id: 4, rank: 4, name: "SMK Negeri 4 Purwokerto", website: "https://smkn4purwokerto.sch.id", rating: 4.5, image: "/images/school4.jpg", level: "SMA/SMK/MA" },
    { id: 5, rank: 5, name: "SMA Negeri 5 Purwokerto", website: "https://sman5purwokerto.sch.id", rating: 4.9, image: "/images/school5.jpg", level: "SMA/SMK/MA" },
    { id: 6, name: "SMP Negeri 6 Purwokerto", website: "https://smpn6purwokerto.sch.id", rating: 4.4, image: "/images/school6.jpg", level: "SMP/MTS" },
    { id: 7, name: "SMK Negeri 7 Purwokerto", website: "https://smkn7purwokerto.sch.id", rating: 4.3, image: "/images/school7.jpg", level: "SMA/SMK/MA" },
    { id: 8, name: "SMA Negeri 8 Purwokerto", website: "https://sman8purwokerto.sch.id", rating: 4.2, image: "/images/school8.jpg", level: "SMA/SMK/MA" },
    { id: 9, name: "SMP Negeri 9 Purwokerto", website: "https://smpn9purwokerto.sch.id", rating: 4.1, image: "/images/school9.jpg", level: "SMP/MTS" },
    { id: 10, name: "SD Negeri 10 Purwokerto", website: "https://sdn10purwokerto.sch.id", rating: 4.0, image: "/images/school10.jpg", level: "SD/MI" },
    { id: 11, name: "SD Negeri 11 Purwokerto", website: "https://sdn11purwokerto.sch.id", rating: 3.9, image: "/images/school11.jpg", level: "SD/MI" },
    { id: 12, name: "MTs Negeri 12 Purwokerto", website: "https://mtn12purwokerto.sch.id", rating: 4.3, image: "/images/school12.jpg", level: "SMP/MTS" },
  ];

  // Filter berdasarkan jenjang
  const filteredSchools = jenjang === 'semua' 
    ? schools 
    : schools.filter(school => school.level === jenjang);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-xl font-bold text-gray-800">Top Ranking Website Sekolah</h1>
        <p className="text-sm text-gray-500 mt-1">Daftar lengkap sekolah terbaik berdasarkan penilaian pengguna</p>
      </div>

      {/* Filter Jenjang */}
      <div className="px-6 py-4 bg-white border-b">
        <label className="mr-4 font-medium">Jenjang:</label>
        <select
          value={jenjang}
          onChange={(e) => setJenjang(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="semua">Semua Jenjang</option>
          <option value="SMA/SMK/MA">SMA/SMK/MA</option>
          <option value="SMP/MTS">SMP/MTS</option>
          <option value="SD/MI">SD/MI</option>
        </select>
      </div>

      {/* Grid Card */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <Image
                src={school.image}
                alt={school.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    school.rank === 1 ? 'bg-blue-100 text-blue-800' :
                    school.rank === 2 ? 'bg-green-100 text-green-800' :
                    school.rank === 3 ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    Top Ranking {school.rank || '?'}
                  </span>
                  <span className="ml-2 text-blue-600 text-xs">🔗</span>
                </div>
                <h3 className="font-semibold text-gray-800">{school.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Link Website: <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{school.website}</a></p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★ {school.rating} / 5</span>
                </div>
                {/* Tombol Lihat Detail — sesuai gambar */}
                <Link href={`/user/school-detail/${school.id}`} className="mt-3 block w-full bg-blue-500 text-white py-1 px-4 rounded-md text-sm hover:bg-blue-600 text-center">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="py-6 text-center text-gray-500 text-sm">
  
      </div>
    </div>
  );
}