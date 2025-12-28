'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DataAkunPage() {
  const [role, setRole] = useState('pengelola');

  // ================== DUMMY DATA PENGELOLA ==================
  // Data ini seharusnya dari database yang sudah di-Accept dari Request Akun
  const pengelolaData = [
    {
      id: 1,
      namaSekolah: 'SMA Negeri 1 Jakarta',
      npsn: '12345678',
      password: 'sma1jkt2024',
      whatsapp: '081298765432', // Dari data request akun
    },
    {
      id: 2,
      namaSekolah: 'SMA Negeri 2 Jakarta',
      npsn: '87654321',
      password: 'sma2jkt2024',
      whatsapp: '08585555555', // Dari data request akun
    },
  ];

  // ================== DUMMY DATA REVIEWER ==================
  // Data ini seharusnya dari database yang sudah di-Accept dari Request Akun
  const reviewerData = [
    {
      id: 1,
      namaReviewer: 'Dr. Ahmad Wijaya',
      email: 'ahmad@email.com',
      password: 'reviewer123',
      whatsapp: '081234567890', // Dari data request akun
    },
    {
      id: 2,
      namaReviewer: 'Prof. Siti Nurhaliza',
      email: 'siti@email.com',
      password: 'reviewer456',
      whatsapp: '081298765432', // Dari data request akun
    },
  ];

  // Fungsi untuk membuka WhatsApp
  const handleWhatsApp = (whatsapp, nama) => {
    // Format nomor WhatsApp (hapus 0 di awal, tambah 62)
    const formattedNumber = whatsapp.startsWith('0') 
      ? '62' + whatsapp.slice(1) 
      : whatsapp;
    
    // Pesan default
    const message = `Halo ${nama}, akun Anda telah dibuat. Berikut detail login Anda.`;
    
    // Buka WhatsApp Web/App
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Fungsi untuk hapus data
  const handleDelete = (id, nama) => {
    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus akun "${nama}"?`);
    if (confirmDelete) {
      alert(`Akun "${nama}" berhasil dihapus!`);
      // TODO: API call untuk delete data dari database
    }
  };

  return (
    <DashboardLayout title="Admin/Data Akun">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {role === 'pengelola'
            ? 'Data Akun Pengelola'
            : 'Data Akun Reviewer'}
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
        >
          <option value="pengelola">Pengelola</option>
          <option value="reviewer">Reviewer</option>
        </select>
      </div>

      {/* CARD TABLE */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          {/* ================= PENGELOLA ================= */}
          {role === 'pengelola' && (
            <table className="w-full text-sm">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Sekolah</th>
                  <th className="px-6 py-4 text-left">NPSN</th>
                  <th className="px-6 py-4 text-left">Password</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {pengelolaData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      Belum ada data akun pengelola
                    </td>
                  </tr>
                ) : (
                  pengelolaData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-5 font-medium text-gray-800">
                        {item.namaSekolah}
                      </td>
                      <td className="px-6 py-5 text-gray-800">
                        {item.npsn}
                      </td>
                      <td className="px-6 py-5 text-gray-800">
                        {item.password}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {/* Button WhatsApp */}
                          <button
                            onClick={() => handleWhatsApp(item.whatsapp, item.namaSekolah)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
                            title="Hubungi via WhatsApp"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                          </button>

                          {/* Button Hapus */}
                          <button
                            onClick={() => handleDelete(item.id, item.namaSekolah)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                            title="Hapus Akun"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* ================= REVIEWER ================= */}
          {role === 'reviewer' && (
            <table className="w-full text-sm">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Reviewer</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Password</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {reviewerData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      Belum ada data akun reviewer
                    </td>
                  </tr>
                ) : (
                  reviewerData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-5 font-medium text-gray-800">
                        {item.namaReviewer}
                      </td>
                      <td className="px-6 py-5 text-gray-800">
                        {item.email}
                      </td>
                      <td className="px-6 py-5 text-gray-800">
                        {item.password}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {/* Button WhatsApp */}
                          <button
                            onClick={() => handleWhatsApp(item.whatsapp, item.namaReviewer)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
                            title="Hubungi via WhatsApp"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                          </button>

                          {/* Button Hapus */}
                          <button
                            onClick={() => handleDelete(item.id, item.namaReviewer)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                            title="Hapus Akun"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}