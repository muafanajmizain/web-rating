'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DetailRequestAkun({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // 'reviewer' atau 'pengelola'
  const [status, setStatus] = useState('Accept');

  // Dummy data reviewer
  const reviewerData = {
    1: {
      nama: 'Ahmad Wijaya',
      email: 'ahmad@email.com',
      whatsapp: '081234567890',
      pendidikan: 'S2 Pendidikan',
      profesi: 'Dosen',
      pengalaman: '5 Tahun',
      cv: 'cv_ahmad.pdf'
    },
    2: {
      nama: 'Ghijinij',
      email: 'abc@gmail.com',
      whatsapp: '08585555555',
      pendidikan: 'S1 Psikologi',
      profesi: 'vrfrgrtggggg',
      pengalaman: 'vrfrgrtggggg',
      cv: 'cv_1.pdf'
    }
  };

  // Dummy data pengelola
  const pengelolaData = {
    1: {
      nama: 'Siti Nurhaliza',
      jabatan: 'Kepala Sekolah',
      whatsapp: '081298765432',
      email: 'siti@email.com',
      suratKuasa: 'surat_kuasa_siti.pdf'
    },
    2: {
      nama: 'Ghijinij',
      jabatan: 'tpinkreek',
      whatsapp: '08585555555',
      email: 'abc@gmail.com',
      suratKuasa: 'surat_kuasa_1.pdf'
    }
  };

  // Ambil data berdasarkan role dan id
  const data = role === 'reviewer' 
    ? reviewerData[params.id] 
    : pengelolaData[params.id];

  const handleAccept = () => {
    setStatus('Accept');
    alert(`${role === 'reviewer' ? 'Reviewer' : 'Pengelola'} berhasil di-Accept`);
    // TODO: API call untuk update status
  };

  const handleReject = () => {
    setStatus('Reject');
    alert(`${role === 'reviewer' ? 'Reviewer' : 'Pengelola'} berhasil di-Reject`);
    // TODO: API call untuk update status
  };

  const handleNonAktif = () => {
    setStatus('Non Aktif');
    alert(`${role === 'reviewer' ? 'Reviewer' : 'Pengelola'} diset menjadi Non Aktif`);
    // TODO: API call untuk update status
  };

  if (!data) {
    return (
      <DashboardLayout title="Admin/User Management">
        <div className="text-center py-12">
          <p className="text-gray-500">Data tidak ditemukan</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin/User Management">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {role === 'reviewer' ? 'Detail Reviewer' : 'Detail Pengelola'}
          </h2>
          
          <div className="space-y-4 mb-8">
            {/* Nama - Selalu Ada */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <p className="text-gray-900">{data.nama}</p>
            </div>

            {/* Email - Selalu Ada */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{data.email}</p>
            </div>

            {/* No WhatsApp - Selalu Ada */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No WhatsApp
              </label>
              <p className="text-gray-900">{data.whatsapp}</p>
            </div>

            {/* Field Khusus Reviewer */}
            {role === 'reviewer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pendidikan Terakhir
                  </label>
                  <p className="text-gray-900">{data.pendidikan}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profesi
                  </label>
                  <p className="text-gray-900">{data.profesi}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pengalaman
                  </label>
                  <p className="text-gray-900">{data.pengalaman}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CV
                  </label>
                  <a 
                    href={`/uploads/${data.cv}`}
                    className="text-blue-600 hover:text-blue-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.cv}
                  </a>
                </div>
              </>
            )}

            {/* Field Khusus Pengelola */}
            {role === 'pengelola' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jabatan
                  </label>
                  <p className="text-gray-900">{data.jabatan}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surat Kuasa
                  </label>
                  <a 
                    href={`/uploads/${data.suratKuasa}`}
                    className="text-blue-600 hover:text-blue-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.suratKuasa}
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleAccept}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Reject
            </button>
            <button
              onClick={handleNonAktif}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Non Aktif
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}