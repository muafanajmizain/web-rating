'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DataAkunPage() {
  const [role, setRole] = useState('pengelola');
  const [akunData, setAkunData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataAkun();
  }, []);

  const fetchDataAkun = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token autentikasi tidak ditemukan");
      }

      const response = await fetch('/api/dataakun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal mengambil data akun');
      }

      // Asumsi response memiliki struktur: { success: true, data: [...] }
      setAkunData(result.data || []);
    } catch (err) {
      console.error('Error fetching akun data:', err);
      setError(err.message || 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  // Filter data berdasarkan role yang dipilih
  const filteredData = akunData.filter((item) =>
    role === 'pengelola'
      ? item.role === 'pengelola'
      : item.role === 'reviewer'
  );

  // Fungsi format nomor WhatsApp (jika diperlukan)
  const formatWhatsAppNumber = (number) => {
    if (!number) return '';
    return number.startsWith('0') ? '62' + number.slice(1) : number;
  };

  // Buka WhatsApp dengan pesan
  const handleWhatsApp = (whatsapp, nama) => {
    if (!whatsapp) return;

    const formatted = formatWhatsAppNumber(whatsapp);
    const message = `Halo ${nama}, berikut detail akun Anda yang sudah aktif.`;
    
    const url = `https://wa.me/${formatted}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Konfirmasi hapus akun
  const handleDelete = async (id, nama) => {
    if (!confirm(`Yakin ingin menghapus akun "${nama}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/api/hapusakun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Akun "${nama}" berhasil dihapus`);
        // Refresh data setelah hapus
        fetchDataAkun();
      } else {
        alert('Gagal menghapus akun: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Terjadi kesalahan: ' + err.message);
    }
  };

  return (
    <DashboardLayout title="Admin / Data Akun">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {role === 'pengelola' ? 'Data Akun Pengelola' : 'Data Akun Reviewer'}
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pengelola">Pengelola</option>
          <option value="reviewer">Reviewer</option>
        </select>
      </div>

      {/* Loading & Error State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600">Memuat data akun...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchDataAkun}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba lagi
          </button>
        </div>
      ) : (
        /* Tabel Data */
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {role === 'pengelola' ? (
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr className="text-gray-700 font-semibold">
                    {/* <th className="px-6 py-4 text-left">Nama Sekolah / Pengelola</th>
                    <th className="px-6 py-4 text-left">NPSN</th> */}
                    <th className="px-6 py-4 text-left">Username</th>
                    <th className="px-6 py-4 text-left">Role</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500">
                        Belum ada data akun pengelola
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        {/* <td className="px-6 py-5 font-medium text-gray-900">
                          {item.namaSekolah || item.nama_lengkap || '-'}
                        </td>
                        <td className="px-6 py-5 text-gray-700">
                          {item.npsn || '-'}
                        </td> */}
                        <td className="px-6 py-5 text-gray-700">
                          {item.username || '-'}
                        </td>
                        <td className="px-6 py-5 text-gray-700">
                          {item.role || '-'}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              item.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleWhatsApp(item.whatsapp || item.no_whatsapp, item.namaSekolah || item.nama_lengkap)}
                              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                              title="Hubungi via WhatsApp"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                              </svg>
                            </button>

                            <button
                              onClick={() => handleDelete(item.account_req_id || item.id, item.namaSekolah || item.nama_lengkap)}
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              title="Hapus Akun"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr className="text-gray-700 font-semibold">
                    {/* <th className="px-6 py-4 text-left">Nama Reviewer</th>
                    <th className="px-6 py-4 text-left">Email</th> */}
                    <th className="px-6 py-4 text-left">Username</th>
                    <th className="px-6 py-4 text-left">Role</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500">
                        Belum ada data akun reviewer
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        {/* <td className="px-6 py-5 font-medium text-gray-900">
                          {item.nama_lengkap || '-'}
                        </td>
                        <td className="px-6 py-5 text-gray-700">
                          {item.email || '-'}
                        </td> */}
                        <td className="px-6 py-5 text-gray-700">
                          {item.username || '-'}
                        </td>
                        <td className="px-6 py-5 text-gray-700">
                          {item.role || '-'}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              item.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleWhatsApp(item.no_whatsapp || item.whatsapp, item.nama_lengkap)}
                              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                              title="Hubungi via WhatsApp"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                              </svg>
                            </button>

                            <button
                              onClick={() => handleDelete(item.account_req_id || item.id, item.nama_lengkap)}
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              title="Hapus Akun"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
      )}
    </DashboardLayout>
  );
}