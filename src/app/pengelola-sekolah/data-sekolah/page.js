// src/app/pengelola-sekolah/data-sekolah/page.js

'use client';
import { useState } from 'react';
import DashboardLayout from '../DashboardLayout';

export default function DataSekolah() {
  // State untuk data sekolah
  const [formData, setFormData] = useState({
    gambar: null,
    namaSekolah: '',
    npsn: '',
    jenjangSekolah: '',
    akreditasi: '',
    nomorTelepon: '',
    statusSekolah: '',
    websiteSekolah: '',
    emailSekolah: '',
    alamatLengkap: '',
    deskripsiSingkat: ''
  });

  // State untuk preview image
  const [previewImage, setPreviewImage] = useState(null);

  // Handler upload gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, gambar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler submit (simpan)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data disimpan:', formData);
    alert('Data sekolah berhasil disimpan!');
  };

  // Handler untuk scroll ke form saat klik Edit
  const scrollToForm = () => {
    document.getElementById('form-data-sekolah').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <DashboardLayout title="Pengelola Web Sekolah">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Data Sekolah</h2>
      </div>

      {/* Alert Warning */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-start gap-3">
        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
        <p className="text-sm text-yellow-800">Silahkan lengkapi data sekolah anda</p>
      </div>

      {/* Form Input */}
      <div id="form-data-sekolah" className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        {/* Upload Gambar */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Gambar</label>
          <div className="flex items-center gap-4">
            <label htmlFor="upload-gambar" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transition duration-200">
              Upload Gambar
            </label>
            <input
              id="upload-gambar"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageUpload}
              className="hidden"
            />
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300" />
            ) : (
              <span className="text-sm text-gray-500">Belum Ada File dipilih</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">Format: JPG, JPEG, PNG (Max 2MB)</p>
        </div>

        {/* Row 1: Nama Sekolah & NPSN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaSekolah"
              value={formData.namaSekolah}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama sekolah"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              NPSN (Nomor Pokok Sekolah Nasional) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="npsn"
              value={formData.npsn}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan NPSN"
            />
          </div>
        </div>

        {/* Row 2: Jenjang Sekolah & Akreditasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jenjang Sekolah <span className="text-red-500">*</span>
            </label>
            <select
              name="jenjangSekolah"
              value={formData.jenjangSekolah}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">TK/SD/SMP/SMA/SMK</option>
              <option value="TK">TK</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Akreditasi <span className="text-red-500">*</span>
            </label>
            <select
              name="akreditasi"
              value={formData.akreditasi}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih Akreditasi</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="Belum Terakreditasi">Belum Terakreditasi</option>
            </select>
          </div>
        </div>

        {/* Row 3: Nomor Telepon & Status Sekolah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Telepon Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status Sekolah <span className="text-red-500">*</span>
            </label>
            <select
              name="statusSekolah"
              value={formData.statusSekolah}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Negeri / Swasta</option>
              <option value="Negeri">Negeri</option>
              <option value="Swasta">Swasta</option>
            </select>
          </div>
        </div>

        {/* Row 4: Website & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Website Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="websiteSekolah"
              value={formData.websiteSekolah}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.sekolah.sch.id"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailSekolah"
              value={formData.emailSekolah}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@sekolah.sch.id"
            />
          </div>
        </div>

        {/* Alamat Lengkap */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alamat Lengkap Sekolah <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="alamatLengkap"
            value={formData.alamatLengkap}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan alamat lengkap"
          />
        </div>

        {/* Deskripsi Singkat */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi Singkat Sekolah <span className="text-red-500">*</span>
          </label>
          <textarea
            name="deskripsiSingkat"
            value={formData.deskripsiSingkat}
            onChange={handleInputChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Tulis deskripsi singkat tentang sekolah..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
          >
            Simpan
          </button>
        </div>
      </div>

     {/* Preview Data Sekolah */}
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-gray-800">Data Sekolah Saya</h3>
  </div>

  <div className="flex items-start gap-8">
    {/* Gambar Sekolah - diperbesar */}
    <div className="w-[180px] h-[180px] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
      {previewImage ? (
        <img
          src={previewImage}
          alt="Logo Sekolah"
          className="w-full h-full object-cover"
        />
      ) : (
        <svg
          className="w-24 h-24 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>

    {/* Detail Informasi - digeser ke kanan & lebih padat */}
    <div className="flex-1 space-y-2">
      <div>
        <span className="text-sm font-semibold text-gray-700">Nama Sekolah</span>
        <p className="text-sm text-gray-800">{formData.namaSekolah || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">NPSN</span>
        <p className="text-sm text-gray-800">{formData.npsn || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Jenjang</span>
        <p className="text-sm text-gray-800">{formData.jenjangSekolah || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Akreditasi</span>
        <p className="text-sm text-gray-800">{formData.akreditasi || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Nomor Telepon</span>
        <p className="text-sm text-gray-800">{formData.nomorTelepon || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Status Sekolah</span>
        <p className="text-sm text-gray-800">{formData.statusSekolah || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Website</span>
        <p className="text-sm text-gray-800">{formData.websiteSekolah || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Email</span>
        <p className="text-sm text-gray-800">{formData.emailSekolah || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Alamat</span>
        <p className="text-sm text-gray-800">{formData.alamatLengkap || '-'}</p>
      </div>

      <div>
        <span className="text-sm font-semibold text-gray-700">Deskripsi</span>
        <p className="text-sm text-gray-800">
          {formData.deskripsiSingkat || '-'}
        </p>
      </div>
    </div>
  </div>

  {/* Tombol Edit */}
  <div className="mt-6 flex justify-end">
    <button
      onClick={scrollToForm}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-5.414a2 2 0 012.828 0L18 18.586A2 2 0 0116.586 20H6a2 2 0 01-2-2v-5.586l5.586-5.586z"
        />
      </svg>
      Edit
    </button>
  </div>
</div>
    </DashboardLayout>
  );
}