// src/app/pengelola-sekolah/data-sekolah/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "../DashboardLayout";
import { useSchoolDetailLocal, updateSchoolByManager } from "@/hooks/useSWR";

export default function DataSekolah() {
  const [user, setUser] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    npsn: "",
    jenjang: "",
    status_sekolah: "",
    telepon: "",
    email: "",
    website: "",
    alamat: "",
    deskripsi: "",
    foto: "",
  });

  // Preview image state
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Get user and school_id from localStorage
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        if (userData?.school_id) {
          setSchoolId(userData.school_id);
        }
      }
    } catch (err) {
      console.error("Failed to get user from localStorage:", err);
    }
  }, []);

  // Fetch school data
  const {
    school,
    isLoading: loading,
    isError: error,
    mutate,
  } = useSchoolDetailLocal(schoolId);

  // Populate form when school data is loaded
  useEffect(() => {
    if (school) {
      setFormData({
        nama: school.nama || "",
        npsn: school.npsn || "",
        jenjang: school.jenjang || "",
        status_sekolah: school.status_sekolah || "",
        telepon: school.telepon || "",
        email: school.email || "",
        website: school.website || "",
        alamat: school.alamat || "",
        deskripsi: school.deskripsi || "",
        foto: school.foto || "",
      });
      if (school.foto) {
        setPreviewImage(school.foto);
      }
    }
  }, [school]);

  // Handler upload gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        show: true,
        type: "error",
        message: "Ukuran file terlalu besar! Maksimal 5MB",
      });
      return;
    }

    // Validate file type
    const validFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validFormats.includes(file.type)) {
      setNotification({
        show: true,
        type: "error",
        message: "Format file tidak valid! Gunakan JPG, JPEG, PNG, GIF, atau WebP",
      });
      return;
    }

    // Store selected file
    setSelectedFile(file);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handler input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler submit (simpan)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      setNotification({
        show: true,
        type: "error",
        message: "Anda belum mengklaim sekolah",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Pass selectedFile as third argument for FormData upload
      await updateSchoolByManager(schoolId, formData, selectedFile);

      setNotification({
        show: true,
        type: "success",
        message: "Data sekolah berhasil disimpan!",
      });

      // Clear selected file after successful save
      setSelectedFile(null);

      // Refresh data
      mutate();
    } catch (err) {
      console.error("Error saving school data:", err);
      setNotification({
        show: true,
        type: "error",
        message: err.message || "Gagal menyimpan data sekolah",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Handler untuk scroll ke form saat klik Edit
  const scrollToForm = () => {
    document
      .getElementById("form-data-sekolah")
      .scrollIntoView({ behavior: "smooth" });
  };

  // No school claimed state
  if (!schoolId && !loading) {
    return (
      <DashboardLayout title="Pengelola Web Sekolah">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Data Sekolah</h2>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <svg
            className="w-16 h-16 text-yellow-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Belum Ada Sekolah Diklaim
          </h3>
          <p className="text-yellow-700 mb-4">
            Anda belum mengklaim sekolah. Silakan klaim sekolah terlebih dahulu
            untuk dapat mengelola data sekolah.
          </p>
          <Link
            href="/user/all-rankings"
            className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Cari dan Klaim Sekolah
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Pengelola Web Sekolah">
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            {notification.type === "success" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span>{notification.message}</span>
            <button
              onClick={() =>
                setNotification({ show: false, type: "", message: "" })
              }
              className="ml-2 hover:opacity-80"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Data Sekolah</h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data sekolah...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 mb-3">
            {error?.message || "Gagal mengambil data sekolah"}
          </p>
          <button
            onClick={() => mutate()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && school && (
        <>
          {/* Alert Warning if data incomplete */}
          {(!school.alamat || !school.telepon || !school.website) && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-start gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-yellow-800">
                Silahkan lengkapi data sekolah anda untuk meningkatkan
                kredibilitas profil sekolah.
              </p>
            </div>
          )}

          {/* Form Input */}
          <div
            id="form-data-sekolah"
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Data Sekolah
            </h3>

            {/* Upload Gambar */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto/Logo Sekolah
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="upload-gambar"
                  className="px-6 py-2 rounded-lg cursor-pointer transition duration-200 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Upload Gambar
                </label>
                <input
                  id="upload-gambar"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                    />
                    {selectedFile && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1" title="File akan diupload saat menyimpan">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    Belum ada gambar
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Format: JPG, JPEG, PNG, GIF, WebP (Max 5MB)
              </p>
              {selectedFile && (
                <p className="text-xs text-yellow-600 mt-1">
                  File "{selectedFile.name}" akan diupload saat menyimpan
                </p>
              )}
            </div>

            {/* Row 1: Nama Sekolah & NPSN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Sekolah <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama sekolah"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  NPSN (Nomor Pokok Sekolah Nasional)
                </label>
                <input
                  type="text"
                  name="npsn"
                  value={formData.npsn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan NPSN"
                />
              </div>
            </div>

            {/* Row 2: Jenjang Sekolah & Status Sekolah */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jenjang Sekolah
                </label>
                <select
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Pilih Jenjang</option>
                  <option value="TK">TK</option>
                  <option value="SD/MI">SD/MI</option>
                  <option value="SMP/MTS">SMP/MTS</option>
                  <option value="SMA/SMK/MA">SMA/SMK/MA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status Sekolah
                </label>
                <select
                  name="status_sekolah"
                  value={formData.status_sekolah}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Pilih Status</option>
                  <option value="Negeri">Negeri</option>
                  <option value="Swasta">Swasta</option>
                </select>
              </div>
            </div>

            {/* Row 3: Nomor Telepon & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Telepon Sekolah
                </label>
                <input
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Sekolah
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@sekolah.sch.id"
                />
              </div>
            </div>

            {/* Website */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website Sekolah
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.sekolah.sch.id"
              />
            </div>

            {/* Alamat Lengkap */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alamat Lengkap Sekolah
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            {/* Deskripsi Singkat */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Singkat Sekolah
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
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
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </div>

          {/* Preview Data Sekolah */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Data Sekolah Saya</h3>
              {school.is_claimed && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Terverifikasi
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Gambar Sekolah */}
              <div className="w-[180px] h-[180px] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                {previewImage || school.foto ? (
                  <img
                    src={previewImage || school.foto}
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
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {/* Detail Informasi */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    Nama Sekolah
                  </span>
                  <p className="text-gray-800">{school.nama || "-"}</p>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    NPSN
                  </span>
                  <p className="text-gray-800">{school.npsn || "-"}</p>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    Jenjang
                  </span>
                  <p className="text-gray-800">{school.jenjang || "-"}</p>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    Status
                  </span>
                  <p className="text-gray-800">{school.status_sekolah || "-"}</p>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    Telepon
                  </span>
                  <p className="text-gray-800">{school.telepon || "-"}</p>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    Email
                  </span>
                  <p className="text-gray-800">{school.email || "-"}</p>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-500">
                    Website
                  </span>
                  <p className="text-gray-800">
                    {school.website ? (
                      <a
                        href={
                          school.website.startsWith("http")
                            ? school.website
                            : `https://${school.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {school.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <span className="text-sm font-semibold text-gray-500">
                    Alamat
                  </span>
                  <p className="text-gray-800">{school.alamat || "-"}</p>
                </div>

                <div className="md:col-span-2">
                  <span className="text-sm font-semibold text-gray-500">
                    Deskripsi
                  </span>
                  <p className="text-gray-800">{school.deskripsi || "-"}</p>
                </div>
              </div>
            </div>

            {/* Tombol Edit */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={scrollToForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Data
              </button>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
