'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import { useSchools } from '@/hooks/useSWR';

export default function DaftarSekolah() {
  const router = useRouter();
  const { schools, isLoading: loading, isError: error } = useSchools();
  const [statusFilter, setStatusFilter] = useState('');

  const filteredSchools = useMemo(() => {
    if (!schools) return [];
    if (statusFilter === '') return schools;
    if (statusFilter === 'Sudah Klaim') {
      return schools.filter((school) => school.is_claimed === true);
    }
    if (statusFilter === 'Belum Klaim') {
      return schools.filter((school) => school.is_claimed === false);
    }
    return schools;
  }, [schools, statusFilter]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDetail = (school) => {
    router.push(`/Admin/sekolah/detail/${school.id}`);
  };

  const handleTambahSekolah = () => {
    router.push('/Admin/sekolah/tambah-sekolah');
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-block h-8 bg-gray-200 rounded-lg w-16"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-block h-6 bg-gray-200 rounded w-24"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Admin/Sekolah">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Daftar Sekolah</h2>

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
          disabled={loading}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:border-gray-400 transition-colors min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Semua Status</option>
          <option value="Sudah Klaim">Sudah Klaim</option>
          <option value="Belum Klaim">Belum Klaim</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <LoadingSkeleton />}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
          Gagal mengambil data sekolah
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              {/* Header */}
              <thead className="bg-white border-b border-gray-200">
                <tr className="font-semibold text-gray-600">
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Nama Sekolah</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              {/* Body */}
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
                    <tr key={school.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{index + 1}</td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        {school.nama}
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
                            school.is_claimed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {school.is_claimed ? 'Sudah Klaim' : 'Belum Klaim'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      {!loading && !error && (
        <div className="mt-4 text-sm text-gray-500">
          Menampilkan {filteredSchools.length} dari {schools.length} sekolah
        </div>
      )}
    </DashboardLayout>
  );
}