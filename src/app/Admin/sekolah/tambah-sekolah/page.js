'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function TambahSekolah() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    npsn: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error saat user mulai mengetik
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 2MB');
        return;
      }

      // Validasi format file
      const validFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validFormats.includes(file.type)) {
        alert('Format file tidak valid! Gunakan .JPG, .JPEG, atau .PNG');
        return;
      }

      setSelectedFile(file);
      
      // Preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi input
    if (!formData.nama.trim()) {
      setError('Nama Sekolah harus diisi!');
      return;
    }

    if (!formData.npsn.trim()) {
      setError('NPSN harus diisi!');
      return;
    }

    if (!/^\d+$/.test(formData.npsn)) {
      setError('NPSN harus berupa angka!');
      return;
    }

    setIsLoading(true);

    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        setIsLoading(false);
        return;
      }

      // Kirim request ke API route internal
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || 'Gagal menambahkan sekolah');
        setIsLoading(false);
        return;
      }

      // Success - Tanya user mau apa
      const addMore = confirm('Data berhasil disimpan! Ingin menambah data lagi?');
      
      if (addMore) {
        // Reset form untuk input baru
        setFormData({ nama: '', npsn: '' });
        setSelectedFile(null);
        setPreview(null);
        setIsLoading(false);
      } else {
        // Redirect ke halaman daftar sekolah
        router.push('/Admin/sekolah');
      }

    } catch (err) {
      console.error('Error:', err);
      setError('Terjadi kesalahan saat menyimpan data');
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Admin / Tambah Sekolah">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Tambah Sekolah
        </h2>
        <div className="flex items-center gap-2 text-sm text-red-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Silahkan lengkapi data sekolah</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Upload Gambar */}
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Upload Gambar
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Gambar
              </div>
            </label>
            <span className="text-sm text-gray-400">
              {selectedFile ? selectedFile.name : 'Belum Ada File dipilih'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Format: .JPG, .JPEG, .PNG (Max 2MB)
          </p>
          {preview && (
            <div className="mt-3">
              <img 
                src={preview} 
                alt="Preview" 
                className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200" 
              />
            </div>
          )}
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">

          {/* Nama Sekolah */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Nama Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              placeholder="Masukkan nama sekolah"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* NPSN */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              NPSN (Nomor Pokok Sekolah Nasional) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="npsn"
              value={formData.npsn}
              onChange={handleInputChange}
              placeholder="Masukkan NPSN"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Jenjang Sekolah */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Jenjang Sekolah
            </label>
            <input
              type="text"
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
          </div>

          {/* Akreditasi */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Akreditasi
            </label>
            <input
              type="text"
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Nomor Telepon Sekolah
            </label>
            <input
              type="text"
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
          </div>

          {/* Status Sekolah */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Status Sekolah
            </label>
            <input
              type="text"
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
          </div>

          {/* Website Sekolah */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Website Sekolah
            </label>
            <input
              type="text"
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
          </div>

          {/* Email Sekolah */}
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Email Sekolah
            </label>
            <input
              type="email"
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
          </div>
        </div>

        {/* Alamat Lengkap */}
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Alamat Lengkap Sekolah
          </label>
          <textarea
            disabled
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Deskripsi Singkat Sekolah
          </label>
          <textarea
            disabled
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-200 text-gray-600 cursor-not-allowed resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">Field ini dinonaktifkan</p>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg text-sm font-semibold transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}