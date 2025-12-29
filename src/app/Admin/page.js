'use client';
import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import { schoolData } from '@/data/schoolData';

export default function AdminDashboard() {
  const [schools] = useState(schoolData);
  const [filteredSchools, setFilteredSchools] = useState(schoolData);
  const [statusFilter, setStatusFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);

    if (value === '') {
      setFilteredSchools(schools);
    } else {
      setFilteredSchools(schools.filter((school) => school.status === value));
    }
  };

  const handleDetail = (school) => {
    alert(
      `Detail Sekolah:\n\nRank: ${school.rank}\nNama: ${school.name}\nScore: ${school.score}\nStatus: ${school.status}`
    );
  };

  return (
    <DashboardLayout title="Admin/Dashboard">
      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 - Website Sekolah */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-200 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white text-sm font-medium mb-2 opacity-90">
              Website Sekolah
            </p>
            <p className="text-3xl font-bold text-white">1700</p>
          </div>
          <div className="absolute top-4 right-4 opacity-20">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Card 2 - Pengelola Website */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-200 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white text-sm font-medium mb-2 opacity-90">
              Pengelola Website
            </p>
            <p className="text-3xl font-bold text-white">1700</p>
          </div>
          <div className="absolute top-4 right-4 opacity-20">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
        </div>

        {/* Card 3 - Reviewer Website */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-200 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white text-sm font-medium mb-2 opacity-90">
              Reviewer Website
            </p>
            <p className="text-3xl font-bold text-white">1700</p>
          </div>
          <div className="absolute top-4 right-4 opacity-20">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Filter ===== */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm min-w-[200px]"
        >
          <option value="">Semua Status</option>
          <option value="Sudah Klaim">Sudah Klaim</option>
          <option value="Belum Klaim">Belum Klaim</option>
        </select>
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="border-b border-gray-200">
              <tr className="font-semibold text-gray-600">
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">Nama Sekolah</th>
                <th className="px-6 py-4 text-left">Total Penilaian</th>
                <th className="px-6 py-4 text-center">Aksi</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                    Tidak ada data sekolah
                  </td>
                </tr>
              ) : (
                filteredSchools.map((school) => (
                  <tr key={school.rank} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{school.rank}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {school.name}
                    </td>
                    <td className="px-6 py-4">{school.score}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDetail(school)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-semibold transition"
                      >
                        Detail
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded text-xs font-semibold ${
                          school.status === 'Sudah Klaim'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Footer Info ===== */}
      <div className="mt-4 text-sm text-gray-500">
        Menampilkan {filteredSchools.length} dari {schools.length} sekolah
      </div>
    </DashboardLayout>
  );
}