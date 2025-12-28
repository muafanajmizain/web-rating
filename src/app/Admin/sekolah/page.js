'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import axios from 'axios';
import { getAllSchool } from '@/app/api/admin/route';

export default function DaftarSekolah() {
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   useEffect(() => {
    const fetchSekolah = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)

        const response = await getAllSchool(token);

        setSchools(response.data); 
      } catch (err) {
        console.error(err);
        setError('Gagal mengambil data sekolah');
      } finally {
        setLoading(false);
      }
    };

    fetchSekolah();
  }, []);

  console.log(schools)
  
  // Dummy data sekolah
  const schoolData = [
    {
      id: 1,
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
    {
      id: 2,
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
    },
  ];

//   const [schools] = useState(schoolData);
  const [filteredSchools, setFilteredSchools] = useState(schoolData);
  const [statusFilter, setStatusFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);

    if (value === '') {
      setFilteredSchools(schools);
    } else {
      setFilteredSchools(
        schools.filter((school) => school.status === value)
      );
    }
  };

  const handleDetail = (school) => {
    router.push(`/Admin/sekolah/detail/${school.id}`);
  };

  const handleTambahSekolah = () => {
    router.push('/Admin/sekolah/tambah-sekolah');
  };

  return (
    <DashboardLayout title="Admin/Sekolah">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Daftar Sekolah
        </h2>

        <button 
          onClick={handleTambahSekolah}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition"
        >
          Tambah Sekolah
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:border-gray-400 transition-colors min-w-[200px]"
        >
          <option value="">Semua Status</option>
          <option value="Sudah Klaim">Sudah Klaim</option>
          <option value="Belum Klaim">Belum Klaim</option>
        </select>
      </div>

      {/* Table */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">

            <thead className="bg-white border-b border-gray-200">
              <tr className="font-semibold text-gray-600">
                <th className="px-6 py-4 text-left">No</th>
                <th className="px-6 py-4 text-left">Nama Sekolah</th>
                <th className="px-6 py-4 text-center">Aksi</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Tidak ada data sekolah
                  </td>
                </tr>
              ) : (
                filteredSchools.map((school, index) => (
                  <tr
                    key={school.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {school.name}
                    </td>

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
      </div> */}

      <div>
      <h2 className="text-xl font-bold mb-4">Daftar Sekolah</h2>

      {schools.length === 0 ? (
  <div className="text-center py-10 text-gray-400">
    <p className="text-sm">Tidak ada data sekolah</p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {schools.map((school) => (
      <div
        key={school.id}
        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {school.nama}
            </h3>
            <p className="text-sm text-gray-500">
              NPSN: {school.npsn}
            </p>
          </div>

          {/* Status */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              school.status === 'Sudah Klaim'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {school.status_sekolah}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={() => handleDetail(school)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-semibold transition"
          >
            Detail
          </button>
        </div>
      </div>
    ))}
  </div>
)}

    </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-500">
        Menampilkan {filteredSchools.length} dari {schools.length} sekolah
      </div>
    </DashboardLayout>
  );
}