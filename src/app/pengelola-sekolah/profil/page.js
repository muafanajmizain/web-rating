'use client';
import { useState } from 'react';
import DashboardLayout from '../DashboardLayout';

export default function ProfilPengelola() {
  // State untuk data profil
  const [profile, setProfile] = useState({
    namaLengkap: 'Guz Nazmi Al-Murafa',
    namaSekolah: '',
    npsn: '',
    linkWebsite: 'https://www.sekolahanda.sch.id',
    email: 'email@sekolahanda.sch.id',
    noWhatsapp: '081234567890',
  });

  // State untuk mode edit
  const [isEditing, setIsEditing] = useState(false);

  // State untuk form ubah kata sandi (opsional)
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State untuk menampilkan form ubah kata sandi
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Handler untuk toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handler untuk cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setShowPasswordForm(false);
    // Reset password form
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Handler untuk simpan perubahan profil
  const handleSave = (e) => {
    e.preventDefault();
    alert('Profil berhasil disimpan!\n\n' + JSON.stringify(profile, null, 2));
    // Di sini Anda bisa kirim ke API atau simpan ke database
    setIsEditing(false); // Kembali ke mode view
  };

  // Handler untuk simpan password
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Kata sandi baru dan konfirmasi tidak cocok!');
      return;
    }
    alert('Kata sandi berhasil diubah!\n\n' + JSON.stringify(passwordForm, null, 2));
    // Reset form
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordForm(false);
  };

  // Handler untuk input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler untuk password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <DashboardLayout title="Profil Pengelola">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Profil Pengelola</h2>
        <p className="text-sm text-gray-600">Data pribadi dan sekolah</p>
      </div>

      {/* Profil Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        {/* Avatar & Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Profil Pengelola</h3>
            <p className="text-xs text-gray-500">Data pribadi dan sekolah</p>
          </div>
        </div>

        {/* Form Profil */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkap"
              value={profile.namaLengkap}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Nama Sekolah */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
            <input
              type="text"
              name="namaSekolah"
              value={profile.namaSekolah}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder="Masukkan nama sekolah"
            />
          </div>

          {/* NPSN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NPSN</label>
            <input
              type="text"
              name="npsn"
              value={profile.npsn}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder="Masukkan NPSN sekolah"
            />
          </div>

          {/* Link Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Website</label>
            <input
              type="url"
              name="linkWebsite"
              value={profile.linkWebsite}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder="https://www.sekolahanda.sch.id"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder="email@sekolahanda.sch.id"
            />
          </div>

          {/* No WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No WhatsApp</label>
            <input
              type="tel"
              name="noWhatsapp"
              value={profile.noWhatsapp}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder="081234567890"
            />
          </div>

          {/* Tombol Ubah Profil / Simpan / Batal */}
          <div className="flex justify-end gap-3 mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
                >
                  Simpan
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-5.414a2 2 0 012.828 0L18 18.586A2 2 0 0116.586 20H6a2 2 0 01-2-2v-5.586l5.586-5.586z" />
                </svg>
                Ubah Profil
              </button>
            )}
          </div>
        </form>

        {/* Garis Pemisah */}
        {isEditing && (
          <div className="border-t border-gray-200 my-6"></div>
        )}

        {/* Bagian Ubah Kata Sandi (hanya muncul saat editing) */}
        {isEditing && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Ubah Kata Sandi</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Lama</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan kata sandi lama"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan kata sandi baru"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Konfirmasi kata sandi baru"
                />
              </div>
            </div>

            {/* Tombol Simpan Password */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSavePassword}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}