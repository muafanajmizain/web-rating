'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function KategoriPenilaianPage() {
  const [kategori, setKategori] = useState('');
  const [kategoriList, setKategoriList] = useState([
    { id: 1, nama: 'Aspek Teknis & Infrastruktur' },
  ]);

  const handleTambah = () => {
    if (!kategori.trim()) {
      alert('Kategori wajib diisi');
      return;
    }

    setKategoriList([
      ...kategoriList,
      { id: Date.now(), nama: kategori },
    ]);

    setKategori('');
  };

  const handleDelete = (id) => {
    if (confirm('Hapus kategori ini?')) {
      setKategoriList(kategoriList.filter((k) => k.id !== id));
    }
  };

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
            Tambah Kategori Penilaian
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
            />

            <button
              onClick={handleTambah}
              className="
                bg-blue-600 hover:bg-blue-700
                text-white px-6 py-2
                rounded-md font-semibold
                shadow-sm transition
              "
            >
              Simpan
            </button>
          </div>
        </div>

        {/* TABLE */}
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
                {kategoriList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.nama}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">

                        {/* EDIT */}
                        <button
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}