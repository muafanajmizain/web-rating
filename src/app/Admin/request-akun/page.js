'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function RequestAkunPage() {
  const router = useRouter();
  const [role, setRole] = useState('pengelola');

  // ================== DUMMY DATA ==================
  const reviewerData = [
    {
      id: 1,
      nama: 'Ahmad Wijaya',
      email: 'ahmad@email.com',
      whatsapp: '081234567890',
      pendidikan: 'S2 Pendidikan',
      profesi: 'Dosen',
      pengalaman: '5 Tahun',
      status: 'Accept',
    },
    {
      id: 2,
      nama: 'Ghijinij',
      email: 'abc@gmail.com',
      whatsapp: '08585555555',
      pendidikan: 'S1 Psikologi',
      profesi: 'vrfrgrtggggg',
      pengalaman: 'vrfrgrtggggg',
      status: 'Reject',
    },
  ];

  const pengelolaData = [
    {
      id: 1,
      nama: 'Siti Nurhaliza',
      jabatan: 'Kepala Sekolah',
      whatsapp: '081298765432',
      email: 'siti@email.com',
      status: 'Accept',
    },
    {
      id: 2,
      nama: 'Ghijinij',
      jabatan: 'tpinkreek',
      whatsapp: '08585555555',
      email: 'abc@gmail.com',
      status: 'Non Aktif',
    },
  ];

  const statusBadge = (status) => {
    switch(status) {
      case 'Accept':
        return 'bg-green-500 text-white';
      case 'Reject':
        return 'bg-red-500 text-white';
      case 'Non Aktif':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  // ✅ ROUTING YANG BENAR - KE FOLDER detail/[id]
  const handleDetail = (id) => {
    router.push(`/Admin/request-akun/detail/${id}?role=${role}`);
  };

  return (
    <DashboardLayout title="Admin/Request Akun">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {role === 'pengelola'
            ? 'Pendaftaran Pengelola'
            : 'Pendaftaran Reviewer'}
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
          {/* ================= REVIEWER ================= */}
          {role === 'reviewer' && (
            <table className="w-full text-sm">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">No WhatsApp</th>
                  <th className="px-6 py-4 text-left">
                    Pendidikan Terakhir
                  </th>
                  <th className="px-6 py-4 text-left">Profesi</th>
                  <th className="px-6 py-4 text-left">Pengalaman</th>
                  <th className="px-6 py-4 text-center">CV</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {reviewerData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {item.nama}
                    </td>
                    <td className="px-6 py-5 text-gray-800">{item.email}</td>
                    <td className="px-6 py-5 text-gray-800">{item.whatsapp}</td>
                    <td className="px-6 py-5 text-gray-800">{item.pendidikan}</td>
                    <td className="px-6 py-5 text-gray-800">{item.profesi}</td>
                    <td className="px-6 py-5 text-gray-800">{item.pengalaman}</td>
                    <td className="px-6 py-5 text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors duration-200">
                        Preview
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => handleDetail(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-xs font-medium transition-colors duration-200"
                      >
                        Detail
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-5 py-2 rounded-lg text-xs font-semibold ${statusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ================= PENGELOLA ================= */}
          {role === 'pengelola' && (
            <table className="w-full text-sm">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left">Jabatan</th>
                  <th className="px-6 py-4 text-left">No WhatsApp</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-center">
                    Surat Kuasa
                  </th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {pengelolaData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {item.nama}
                    </td>
                    <td className="px-6 py-5 text-gray-800">{item.jabatan}</td>
                    <td className="px-6 py-5 text-gray-800">{item.whatsapp}</td>
                    <td className="px-6 py-5 text-gray-800">{item.email}</td>
                    <td className="px-6 py-5 text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors duration-200">
                        Preview
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => handleDetail(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-xs font-medium transition-colors duration-200"
                      >
                        Detail
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-5 py-2 rounded-lg text-xs font-semibold ${statusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}