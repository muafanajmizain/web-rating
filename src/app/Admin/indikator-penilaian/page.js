'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import {
  useIndicators,
  useCategories,
  createIndicator,
  updateIndicator,
  deleteIndicator,
} from '@/hooks/useSWR';

export default function IndikatorPenilaianPage() {
  const { indicators, isLoading, isError, mutate } = useIndicators();
  const { categories, isLoading: loadingCategories } = useCategories();

  const [formData, setFormData] = useState({
    judul: '',
    category_id: '',
    deskripsi: '',
  });
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSimpan = async () => {
    if (!formData.judul || !formData.category_id) {
      alert('Indikator dan kategori wajib diisi');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editId) {
        await updateIndicator(editId, {
          category_id: formData.category_id,
          judul: formData.judul,
          deskripsi: formData.deskripsi,
        });
        setEditId(null);
      } else {
        await createIndicator({
          category_id: formData.category_id,
          judul: formData.judul,
          deskripsi: formData.deskripsi,
        });
      }
      setFormData({ judul: '', category_id: '', deskripsi: '' });
      mutate(); // Refresh data
    } catch (error) {
      alert(error.message || 'Gagal menyimpan indikator');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      judul: item.judul,
      category_id: item.category_id,
      deskripsi: item.deskripsi || '',
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({ judul: '', category_id: '', deskripsi: '' });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus indikator ini?')) return;

    try {
      await deleteIndicator(id);
      mutate(); // Refresh data
    } catch (error) {
      alert(error.message || 'Gagal menghapus indikator');
    }
  };

  // Get category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || '-';
  };

  // Loading Skeleton
  const TableSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left w-16">No</th>
              <th className="px-6 py-4 text-left">Indikator</th>
              <th className="px-6 py-4 text-left">Kategori</th>
              <th className="px-6 py-4 text-left">Keterangan</th>
              <th className="px-6 py-4 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
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
    <DashboardLayout title="Admin/Indikator Penilaian">
      <div className="max-w-5xl mx-auto space-y-12">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Indikator Penilaian
        </h1>

        {/* FORM */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {editId ? 'Edit Indikator' : 'Tambah Indikator Penilaian'}
          </h2>

          <div className="flex gap-6 items-center">
            <label className="w-56 text-sm font-medium text-gray-700">
              Indikator Penilaian
            </label>
            <input
              type="text"
              value={formData.judul}
              onChange={(e) => handleInputChange('judul', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none"
              placeholder="Contoh: Domain Active"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-6 items-center">
            <label className="w-56 text-sm font-medium text-gray-700">
              Kategori Penilaian
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => handleInputChange('category_id', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none"
              disabled={isSubmitting || loadingCategories}
            >
              <option value="">
                {loadingCategories ? 'Memuat kategori...' : 'Pilih Kategori'}
              </option>
              {categories.map((kat) => (
                <option key={kat.id} value={kat.id}>
                  {kat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-6 items-start">
            <label className="w-56 text-sm font-medium text-gray-700 pt-2">
              Keterangan
            </label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => handleInputChange('deskripsi', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md min-h-[100px] bg-white focus:outline-none resize-none"
              placeholder="Deskripsi indikator (opsional)"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-2">
            {editId && (
              <button
                onClick={handleCancelEdit}
                disabled={isSubmitting}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-md text-sm font-semibold"
              >
                Batal
              </button>
            )}
            <button
              onClick={handleSimpan}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-2 rounded-md text-sm font-semibold"
            >
              {isSubmitting ? 'Menyimpan...' : editId ? 'Update' : 'Simpan'}
            </button>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
            Gagal memuat data indikator
          </div>
        )}

        {/* Loading State */}
        {isLoading && <TableSkeleton />}

        {/* TABLE */}
        {!isLoading && !isError && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left w-16">No</th>
                    <th className="px-6 py-4 text-left">Indikator</th>
                    <th className="px-6 py-4 text-left">Kategori</th>
                    <th className="px-6 py-4 text-left">Keterangan</th>
                    <th className="px-6 py-4 text-center w-24">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {indicators.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                        Belum ada indikator penilaian
                      </td>
                    </tr>
                  ) : (
                    indicators.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4 font-medium">{item.judul}</td>
                        <td className="px-6 py-4">{getCategoryName(item.category_id)}</td>
                        <td className="px-6 py-4">{item.deskripsi || '-'}</td>

                        {/* AKSI */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-3">

                            {/* EDIT */}
                            <button
                              onClick={() => handleEdit(item)}
                              className="w-8 h-8 flex items-center justify-center
                                         border border-blue-500 rounded-md
                                         text-blue-600 hover:bg-blue-50 transition"
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
                              className="w-8 h-8 flex items-center justify-center
                                         border border-red-500 rounded-md
                                         text-red-600 hover:bg-red-50 transition"
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
        {!isLoading && !isError && indicators.length > 0 && (
          <div className="text-sm text-gray-500">
            Total {indicators.length} indikator
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
