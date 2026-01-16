'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function RequestAkunPage() {
  const router = useRouter();
  const [role, setRole] = useState('pengelola');
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequestAkun();
  }, []);

  const getRequestAkun = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch('/api/requestakun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Request Akun data:', result);
        setRequestData(result.data || []);
      } else {
        console.error('Error fetching data:', result);
        // optional: alert atau tampilkan pesan error ke user
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accept':
      case 'diterima':
        return 'bg-green-500 text-white';
      case 'reject':
      case 'ditolak':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const handleDetail = (id) => {
    router.push(`/Admin/request-akun/detail/${id}?role=${role}`);
  };

  // Filter data berdasarkan role yang dipilih
  const filteredData = requestData.filter((item) =>
    role === 'pengelola'
      ? item.role !== 'reviewer' // atau sesuaikan logika role pengelola
      : item.role === 'reviewer'
  );

  return (
    <DashboardLayout title="Admin / Request Akun">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {role === 'pengelola' ? 'Pendaftaran Pengelola' : 'Pendaftaran Reviewer'}
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
          {loading ? (
            <div className="text-center py-10 text-gray-500">Memuat data...</div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Belum ada permintaan {role === 'pengelola' ? 'pengelola' : 'reviewer'}
            </div>
          ) : role === 'reviewer' ? (
            // ================== TABLE REVIEWER ==================
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">No WhatsApp</th>
                  <th className="px-6 py-4 text-left">Pendidikan Terakhir</th>
                  <th className="px-6 py-4 text-left">Profesi</th>
                  <th className="px-6 py-4 text-center">CV</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-5 font-medium text-gray-900">
                      {item.nama_lengkap || '-'}
                    </td>
                    <td className="px-6 py-5 text-gray-700">{item.email || '-'}</td>
                    <td className="px-6 py-5 text-gray-700">{item.no_whatsapp || '-'}</td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.pendidikan_terakhir || '-'}
                    </td>
                    <td className="px-6 py-5 text-gray-700">{item.profesi || '-'}</td>
                    <td className="px-6 py-5 text-center">
                      {item.upload_cv ? (
                        <a
                          href={item.upload_cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Lihat CV
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleDetail(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${statusBadge(
                          item.status
                        )}`}
                      >
                        {item.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // ================== TABLE PENGELOLA ==================
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left">Jabatan</th>
                  <th className="px-6 py-4 text-left">No WhatsApp</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-center">Surat Kuasa</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-5 font-medium text-gray-900">
                      {item.nama_lengkap || '-'}
                    </td>
                    <td className="px-6 py-5 text-gray-700">{item.jabatan || '-'}</td>
                    <td className="px-6 py-5 text-gray-700">{item.no_whatsapp || '-'}</td>
                    <td className="px-6 py-5 text-gray-700">{item.email || '-'}</td>
                    <td className="px-6 py-5 text-center">
                      {item.upload_surat_kuasa ? (
                        <a
                          href={item.upload_surat_kuasa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Lihat Surat
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleDetail(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${statusBadge(
                          item.status
                        )}`}
                      >
                        {item.status || 'pending'}
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