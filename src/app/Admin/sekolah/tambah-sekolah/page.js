"use client";
import DashboardLayout from "@/app/Admin/DashboardLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUpload } from "@/hooks/useSWR";

export default function TambahSekolah() {
  const router = useRouter();
  const { uploadFile, isUploading, error: uploadError } = useUpload();
  const [formData, setFormData] = useState({
    nama: "",
    npsn: "",
    banner: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview first
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);

      // Upload file via hook
      const result = await uploadFile(file, "school");

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          banner: result.path,
        }));
      } else {
        setError(result.error);
        setPreview(null);
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nama.trim()) {
      setError("Nama Sekolah harus diisi!");
      return;
    }

    if (!formData.npsn.trim()) {
      setError("NPSN harus diisi!");
      return;
    }

    if (!/^\d+$/.test(formData.npsn)) {
      setError("NPSN harus berupa angka!");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan. Silakan login kembali.");
        setIsLoading(false);
        return;
      }

      // Sesuaikan dengan endpoint API Anda
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/schools`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle error message yang lebih user-friendly
        let errorMessage = data.message || "Gagal menambahkan sekolah";

        // Cek jika error duplicate NPSN
        if (
          errorMessage.includes("duplicate") ||
          errorMessage.includes("npsn")
        ) {
          errorMessage = "NPSN sudah terdaftar! Gunakan NPSN yang berbeda.";
        }

        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Success - Show modal
      setShowSuccessModal(true);
      setIsLoading(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        localStorage.setItem("refreshSchoolList", "true");
        router.push("/Admin/sekolah");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setError("Terjadi kesalahan saat menyimpan data");
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/Admin/sekolah");
  };

  return (
    <DashboardLayout title="Admin / Tambah Sekolah">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Tambah Sekolah</h2>
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm font-medium transition"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-red-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Silahkan lengkapi data sekolah</span>
        </div>
      </div>

      {/* Error Message */}
      {(error || uploadError) && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error || uploadError}
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
            <label className={`${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
              <div className={`${isUploading ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2`}>
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Mengupload...
                  </>
                ) : (
                  <>
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
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload Gambar
                  </>
                )}
              </div>
            </label>
            <span className="text-sm text-gray-400">
              {isUploading ? 'Sedang mengupload...' : (selectedFile ? selectedFile.name : "Belum Ada File dipilih")}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Format: .JPG, .JPEG, .PNG, .GIF, .WebP (Max 5MB)
          </p>
          {preview && (
            <div className="mt-3 relative">
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
              />
              {formData.banner && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
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
              NPSN (Nomor Pokok Sekolah Nasional){" "}
              <span className="text-red-500">*</span>
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
            <p className="text-xs text-gray-400 mt-1">
              Field ini dinonaktifkan
            </p>
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
            <p className="text-xs text-gray-400 mt-1">
              Field ini dinonaktifkan
            </p>
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
            <p className="text-xs text-gray-400 mt-1">
              Field ini dinonaktifkan
            </p>
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
            <p className="text-xs text-gray-400 mt-1">
              Field ini dinonaktifkan
            </p>
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
            <p className="text-xs text-gray-400 mt-1">
              Field ini dinonaktifkan
            </p>
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
            <p className="text-xs text-gray-400 mt-1">
              Field ini dinonaktifkan
            </p>
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
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg text-sm font-semibold transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg text-sm font-semibold transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg
                  className="h-10 w-10 text-green-600"
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
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Berhasil!
            </h3>
            <p className="text-sm text-gray-600">
              Data sekolah berhasil disimpan
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
