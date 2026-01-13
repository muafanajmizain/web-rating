"use client";
import DashboardLayout from "@/app/Admin/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSekolah() {
  const router = useRouter();
  const params = useParams();

  // ALTERNATIF: Extract ID dari pathname jika params.id gagal
  const schoolId =
    params?.id ||
    (typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null);

  console.log("🔧 School ID:", schoolId);
  console.log("🔧 From params:", params?.id);
  console.log(
    "🔧 From pathname:",
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null
  );

  const [formData, setFormData] = useState({
    nama: "",
    npsn: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch data sekolah untuk di-edit
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // LOG PERTAMA - CEK PARAMS
        console.log("🔍 RAW PARAMS:", params);
        console.log("🔍 params.id:", params?.id);
        console.log("🔍 schoolId:", schoolId);
        console.log("🔍 window.location.pathname:", window.location.pathname);
        console.log("🔍 window.location.href:", window.location.href);

        if (!schoolId) {
          console.error("❌ schoolId is undefined or null!");
          setError("ID sekolah tidak ditemukan");
          setIsFetching(false);
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token tidak ditemukan. Silakan login kembali.");
          setIsFetching(false);
          return;
        }

        console.log("Fetching school data for ID:", schoolId);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/schools/${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Fetched school data:", data);

        if (!response.ok || !data.success) {
          setError(data.message || "Gagal mengambil data sekolah");
          setIsFetching(false);
          return;
        }

        // Set form data dengan data yang ada
        setFormData({
          nama: data.data.nama || "",
          npsn: data.data.npsn || "",
        });

        // Set preview gambar jika ada
        if (data.data.foto) {
          setPreview(data.data.foto);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchSchoolData();
  }, [schoolId]); // Ganti dependency dari params?.id ke schoolId

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file terlalu besar! Maksimal 2MB");
        return;
      }

      const validFormats = ["image/jpeg", "image/jpg", "image/png"];
      if (!validFormats.includes(file.type)) {
        alert("Format file tidak valid! Gunakan .JPG, .JPEG, atau .PNG");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
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

    // VALIDASI ID SEBELUM REQUEST
    if (!schoolId) {
      setError("ID sekolah tidak ditemukan. Tidak dapat melakukan update.");
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

      console.log("=== DEBUG UPDATE REQUEST ===");
      console.log("params:", params);
      console.log("params.id:", params?.id);
      console.log("schoolId:", schoolId);
      console.log("params.id type:", typeof params?.id);
      console.log("schoolId type:", typeof schoolId);
      console.log("formData:", formData);
      console.log("selectedFile:", selectedFile);
      console.log("===========================");

      // SOLUSI ALTERNATIF: Coba kirim dalam format berbeda tergantung ada/tidaknya file
      let response;

      if (selectedFile) {
        // Jika ada file, gunakan FormData
        const formDataToSend = new FormData();
        // ❌ JANGAN kirim ID di body - ID sudah ada di URL!
        // formDataToSend.append('id', String(schoolId));
        formDataToSend.append("nama", formData.nama);
        formDataToSend.append("npsn", formData.npsn);
        formDataToSend.append("foto", selectedFile);

        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/schools/${schoolId}`;
        console.log("API URL (with file):", apiUrl);
        console.log("FormData contents:");
        for (let [key, value] of formDataToSend.entries()) {
          console.log(`  ${key}:`, value);
        }

        response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });
      } else {
        // Jika tidak ada file, gunakan JSON
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/schools/${schoolId}`;
        const bodyData = {
          // ❌ JANGAN kirim ID di body - ID sudah ada di URL!
          // id: String(schoolId),
          nama: formData.nama,
          npsn: formData.npsn,
        };

        console.log("API URL (JSON):", apiUrl);
        console.log("JSON body:", bodyData);

        response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
      }

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Update response:", data);

      if (!response.ok || !data.success) {
        let errorMessage = data.message || "Gagal mengupdate sekolah";

        // Handle error duplicate NPSN
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

      // Success
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

  // Loading state saat fetch data
  if (isFetching) {
    return (
      <DashboardLayout title="Admin / Edit Sekolah">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
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
            <p className="text-gray-600">Memuat data sekolah...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin / Edit Sekolah">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Edit Sekolah</h2>
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
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Edit data sekolah yang sudah ada</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
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
                Ganti Gambar
              </div>
            </label>
            <span className="text-sm text-gray-400">
              {selectedFile ? selectedFile.name : "Belum ada perubahan"}
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
            disabled={isLoading}
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
              "Simpan Perubahan"
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
              Data sekolah berhasil diupdate
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
