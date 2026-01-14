'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import {
  useCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/hooks/useSWR';

export default function KategoriPenilaianPage() {
  const { categories, isLoading, isError, mutate } = useCategories();
  const [kategori, setKategori] = useState('');
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTambah = async () => {
    if (!kategori.trim()) {
      alert('Kategori wajib diisi');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editId) {
        await updateCategory(editId, kategori);
        setEditId(null);
      } else {
        await createCategory(kategori);
      }
      setKategori('');
      mutate(); // Refresh data
    } catch (error) {
      alert(error.message || 'Gagal menyimpan kategori');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setKategori(item.name);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setKategori('');
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori ini?')) return;

    try {
      await deleteCategory(id);
      mutate(); // Refresh data
    } catch (error) {
      alert(error.message || 'Gagal menghapus kategori');
    }
  };

  // Loading Skeleton
  const TableSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-white border-b border-gray-200">
            <tr className="font-semibold text-gray-600">
              <th className="px-6 py-4 text-left w-16">No</th>
              <th className="px-6 py-4 text-left">Kategori</th>
              <th className="px-6 py-4 text-center w-32">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Admin/Kategori Penilaian">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Kategori Penilaian
        </h1>

        {/* FORM TAMBAH */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {editId ? 'Edit Kategori Penilaian' : 'Tambah Kategori Penilaian'}
          </h2>

          <div className="flex items-center gap-6">
            <label className="w-56 text-sm font-medium text-gray-700">
              Kategori Penilaian
            </label>

            <input
              type="text"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="
                flex-1 px-4 py-2
                border-2 border-gray-400
                rounded-md
                bg-white
                focus:outline-none
              "
              placeholder="Contoh: Aspek Konten"
              disabled={isSubmitting}
            />

            <div className="flex gap-2">
              {editId && (
                <button
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                  className="
                    bg-gray-500 hover:bg-gray-600
                    disabled:bg-gray-300
                    text-white px-4 py-2
                    rounded-md font-semibold
                    shadow-sm transition
                  "
                >
                  Batal
                </button>
              )}
              <button
                onClick={handleTambah}
                disabled={isSubmitting}
                className="
                  bg-blue-600 hover:bg-blue-700
                  disabled:bg-blue-300
                  text-white px-6 py-2
                  rounded-md font-semibold
                  shadow-sm transition
                "
              >
                {isSubmitting ? 'Menyimpan...' : editId ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
            Gagal memuat data kategori
          </div>
        )}

        {/* Loading State */}
        {isLoading && <TableSkeleton />}

        {/* TABLE */}
        {!isLoading && !isError && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-white border-b border-gray-200">
                  <tr className="font-semibold text-gray-600">
                    <th className="px-6 py-4 text-left w-16">No</th>
                    <th className="px-6 py-4 text-left">Kategori</th>
                    <th className="px-6 py-4 text-center w-32">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                        Belum ada kategori penilaian
                      </td>
                    </tr>
                  ) : (
                    categories.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 font-medium text-gray-800">
                          {item.name}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-3">

                            {/* EDIT */}
                            <button
                              onClick={() => handleEdit(item)}
                              className="
                                w-8 h-8
                                flex items-center justify-center
                                border border-blue-500
                                rounded-md text-blue-600
                                hover:bg-blue-50
                                transition
                              "
                              title="Edit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 3.487a2.1 2.1 0 113.651 2.226L8.25 17.975l-4.5 1.125 1.125-4.5L16.862 3.487z"
                                />
                              </svg>
                            </button>

                            {/* DELETE */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="
                                w-8 h-8
                                flex items-center justify-center
                                border border-red-500
                                rounded-md text-red-600
                                hover:bg-red-50
                                transition
                              "
                              title="Hapus"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 13a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7zm5-3h6a1 1 0 011 1v2H8V5a1 1 0 011-1z"
                                />
                              </svg>
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Info */}
        {!isLoading && !isError && categories.length > 0 && (
          <div className="text-sm text-gray-500">
            Total {categories.length} kategori
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
