'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function IndikatorPenilaianPage() {
  const [formData, setFormData] = useState({
    indikator: '',
    kategori: '',
    keterangan: '',
  });

  const [editId, setEditId] = useState(null);

  const [indikatorList, setIndikatorList] = useState([
    {
      id: 1,
      indikator: 'Domain Active',
      kategori: 'Aspek Teknis & Infrastruktur',
      keterangan: 'Website memiliki domain yang aktif dan dapat diakses',
    },
  ]);

  const kategoriOptions = [
    'Aspek Teknis & Infrastruktur',
    'Aspek Konten',
    'Aspek Desain & UX',
    'Aspek Keamanan',
    'Aspek SEO',
    'Aspek Fungsionalitas',
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSimpan = () => {
    if (!formData.indikator || !formData.kategori) {
      alert('Indikator dan kategori wajib diisi');
      return;
    }

    if (editId) {
      setIndikatorList(
        indikatorList.map((item) =>
          item.id === editId ? { ...item, ...formData } : item
        )
      );
      setEditId(null);
    } else {
      setIndikatorList([
        ...indikatorList,
        {
          id: indikatorList.length + 1,
          ...formData,
        },
      ]);
    }

    setFormData({ indikator: '', kategori: '', keterangan: '' });
  };

  const handleEdit = (item) => {
    setFormData({
      indikator: item.indikator,
      kategori: item.kategori,
      keterangan: item.keterangan,
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (confirm('Hapus indikator ini?')) {
      setIndikatorList(indikatorList.filter((i) => i.id !== id));
    }
  };

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
              value={formData.indikator}
              onChange={(e) => handleInputChange('indikator', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none"
            />
          </div>

          <div className="flex gap-6 items-center">
            <label className="w-56 text-sm font-medium text-gray-700">
              Kategori Penilaian
            </label>
            <select
              value={formData.kategori}
              onChange={(e) => handleInputChange('kategori', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none"
            >
              <option value="">Pilih Kategori</option>
              {kategoriOptions.map((kat, i) => (
                <option key={i} value={kat}>{kat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-6 items-start">
            <label className="w-56 text-sm font-medium text-gray-700 pt-2">
              Keterangan
            </label>
            <textarea
              value={formData.keterangan}
              onChange={(e) => handleInputChange('keterangan', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md min-h-[100px] bg-white focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSimpan}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md text-sm font-semibold"
            >
              {editId ? 'Update' : 'Simpan'}
            </button>
          </div>
        </div>

        {/* TABLE */}
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
                {indikatorList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{item.indikator}</td>
                    <td className="px-6 py-4">{item.kategori}</td>
                    <td className="px-6 py-4">{item.keterangan}</td>

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
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}