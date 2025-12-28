'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DetailSekolah({ params }) {
  const router = useRouter();

  // Dummy data - seharusnya fetch berdasarkan params.id
  const schoolData = {
    1: {
      name: 'SMA Negeri 1 Purwokerto',
      npsn: '1234567',
      jenjang: 'SMA',
      akreditasi: 'A',
      noTelepon: '08978868',
      status: 'Sudah Klaim',
      statusSekolah: 'Negeri',
      website: 'sman1purwokerto.sch.id',
      email: 'sman1pwt@gmail.com',
      alamat: 'Jl. in aja dulu rt 05/01',
      deskripsi: 'Assalamu alaikum, puji tuhan'
    },
    2: {
      name: 'SMA Negeri 2 Jakarta',
      npsn: '7654321',
      jenjang: 'SMA',
      akreditasi: 'A',
      noTelepon: '08123456789',
      status: 'Belum Klaim',
      statusSekolah: 'Negeri',
      website: 'sman2jakarta.sch.id',
      email: 'sman2jkt@gmail.com',
      alamat: 'Jl. Raya Jakarta No. 123',
      deskripsi: 'Sekolah unggulan di Jakarta'
    }
  };

  const school = schoolData[params.id];

  const handleEdit = () => {
    alert('Fitur edit sedang dalam pengembangan');
  };

  const handleDelete = () => {
    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus data "${school.name}"?`);
    if (confirmDelete) {
      alert(`Data "${school.name}" berhasil dihapus!`);
      router.push('/Admin/sekolah');
    }
  };

  if (!school) {
    return (
      <DashboardLayout title="Admin / Detail Sekolah">
        <div className="text-center py-12">
          <p className="text-gray-500">Data sekolah tidak ditemukan</p>
          <button
            onClick={() => router.push('/Admin/sekolah')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Kembali ke Daftar Sekolah
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin / Detail Sekolah">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Detail Sekolah
        </h1>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Header Visual */}
          <div className="relative bg-gradient-to-br from-gray-600 to-gray-800 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {school.name.split(' ').slice(0, 2).join(' ')}
                </h2>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  {school.name.split(' ').slice(2).join(' ')}
                </h1>
                <p className="text-sm mt-2 opacity-80">
                  {school.statusSekolah} {school.jenjang}
                </p>
                <p className="text-xs mt-2 opacity-60">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded">
                    Akreditasi {school.akreditasi}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Detail Information */}
          <div className="p-8">
            <div className="space-y-4 mb-6">
              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Nama Sekolah</span>
                <span className="text-sm text-gray-900">: {school.name}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">NPSN</span>
                <span className="text-sm text-gray-900">: {school.npsn}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Jenjang Sekolah</span>
                <span className="text-sm text-gray-900">: {school.jenjang}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Akreditasi</span>
                <span className="text-sm text-gray-900">: {school.akreditasi}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Nomor Telepon Sekolah</span>
                <span className="text-sm text-gray-900">: {school.noTelepon}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Status Sekolah</span>
                <span className="text-sm text-gray-900">: {school.statusSekolah}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Website Sekolah (jika ada)</span>
                <span className="text-sm text-blue-600">
                  : <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {school.website}
                    </a>
                </span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Email Sekolah</span>
                <span className="text-sm text-gray-900">: {school.email}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Alamat Lengkap Sekolah</span>
                <span className="text-sm text-gray-900">: {school.alamat}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Deskripsi Singkat Sekolah</span>
                <span className="text-sm text-gray-900">: {school.deskripsi}</span>
              </div>

              <div className="flex items-center">
                <span className="w-56 text-sm font-medium text-gray-700">Status</span>
                <span className="text-sm">
                  : <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold ml-1 ${
                    school.status === 'Sudah Klaim'
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}>
                    {school.status === 'Sudah Klaim' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {school.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 justify-end">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}