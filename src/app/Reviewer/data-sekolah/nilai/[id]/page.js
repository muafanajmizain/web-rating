// src/app/Reviewer/data-sekolah/nilai/[id]/page.js

"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSchoolDetailLocal } from "@/hooks/useSWR";
import { useAllIndicatorsPublic } from "@/hooks/useIndicators";
import { createReview } from "@/hooks/useTanggapan";

export default function SchoolRatingPage({ params }) {
  const { id: schoolId } = use(params);
  const router = useRouter();

  // Fetch school data
  const {
    school,
    isLoading: schoolLoading,
    isError: schoolError,
  } = useSchoolDetailLocal(schoolId);

  // Fetch indicators via public endpoints (accessible to reviewers)
  const {
    indicators,
    isLoading: indicatorsLoading,
    isError: indicatorsError,
  } = useAllIndicatorsPublic();

  // Get user from localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Form state
  const [ratings, setRatings] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize ratings when indicators are loaded
  useEffect(() => {
    if (indicators && indicators.length > 0) {
      setRatings(
        indicators.map((indicator) => ({
          indicator_id: indicator.id,
          judul: indicator.judul,
          deskripsi: indicator.deskripsi,
          skor: 3,
          alasan: "",
          link_bukti: "",
        }))
      );
    }
  }, [indicators]);

  const handleInputChange = (index, field, value) => {
    const newRatings = [...ratings];
    if (field === "skor") {
      let numValue = parseInt(value, 10);
      if (isNaN(numValue)) numValue = 0;
      numValue = Math.max(0, Math.min(5, numValue));
      newRatings[index].skor = numValue;
    } else {
      newRatings[index][field] = value;
    }
    setRatings(newRatings);

    // Clear error for this field
    const errorKey = `${field}-${index}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    ratings.forEach((item, index) => {
      // Link bukti required if skor < 3
      if (item.skor < 3 && (!item.link_bukti || item.link_bukti.trim() === "")) {
        newErrors[`link_bukti-${index}`] =
          "Link bukti wajib diisi karena skor < 3";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitClick = () => {
    setSubmitError("");
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare items for submission
      const items = ratings.map((rating) => ({
        indicator_id: rating.indicator_id,
        skor: rating.skor,
        alasan: rating.alasan || null,
        link_bukti: rating.link_bukti || null,
      }));

      await createReview({
        reviewer_id: user?.id,
        school_id: schoolId,
        items,
      });

      setShowSuccessModal(true);

      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push("/Reviewer/data-sekolah");
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitError(error.message || "Gagal mengirim penilaian");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (schoolLoading || indicatorsLoading) {
    return (
      <div className="p-8 flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (schoolError || indicatorsError) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Gagal memuat data</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // School not found
  if (!school) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 font-medium">Sekolah tidak ditemukan</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // No indicators
  if (!indicators || indicators.length === 0) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 font-medium">
            Belum ada indikator penilaian
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex-1 overflow-auto relative">
      <h2 className="text-3xl font-bold mb-6">Penilaian Website Sekolah</h2>

      {/* School Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block">
              Nama Sekolah
            </label>
            <p className="mt-2 text-gray-900 font-medium text-lg">
              {school.nama}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">
              NPSN
            </label>
            <p className="mt-2 text-gray-900 font-medium">{school.npsn || "-"}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">
              Jenjang
            </label>
            <p className="mt-2 text-gray-900 font-medium">
              {school.jenjang || "-"}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block">
              Website Sekolah
            </label>
            {school.website ? (
              <a
                href={
                  school.website.startsWith("http")
                    ? school.website
                    : `https://${school.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium break-all"
              >
                {school.website}
              </a>
            ) : (
              <p className="mt-2 text-gray-500">Tidak tersedia</p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      {/* Rating Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <h3 className="text-xl font-bold text-gray-800">Tabel Penilaian</h3>
          <p className="text-sm text-gray-600 mt-1">
            Berikan skor 0-5 untuk setiap indikator. Link bukti wajib diisi jika
            skor &lt; 3
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-center w-16">No</th>
                <th className="px-6 py-4 text-left">Indikator Penilaian</th>
                <th className="px-6 py-4 text-center w-24">Skor</th>
                <th className="px-6 py-4 text-center w-64">Alasan (Opsional)</th>
                <th className="px-6 py-4 text-center w-64">Link Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ratings.map((item, index) => (
                <tr key={item.indicator_id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">
                      {item.judul}
                    </p>
                    {item.deskripsi && (
                      <p className="text-xs text-gray-600 mt-1">
                        {item.deskripsi}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={item.skor}
                      onChange={(e) =>
                        handleInputChange(index, "skor", e.target.value)
                      }
                      disabled={isSubmitting}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    >
                      {[0, 1, 2, 3, 4, 5].map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      rows="2"
                      value={item.alasan}
                      onChange={(e) =>
                        handleInputChange(index, "alasan", e.target.value)
                      }
                      placeholder="Masukkan alasan..."
                      disabled={isSubmitting}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      rows="2"
                      value={item.link_bukti}
                      onChange={(e) =>
                        handleInputChange(index, "link_bukti", e.target.value)
                      }
                      placeholder={
                        item.skor < 3
                          ? "Wajib diisi karena skor < 3"
                          : "Masukkan link bukti..."
                      }
                      disabled={isSubmitting}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        errors[`link_bukti-${index}`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`link_bukti-${index}`] && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[`link_bukti-${index}`]}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          Batal
        </button>
        <button
          onClick={handleSubmitClick}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
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
              Mengirim...
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
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Kirim Penilaian
            </>
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Konfirmasi Pengiriman
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin mengirim penilaian ini? Penilaian yang
              sudah dikirim tidak dapat diubah.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ya, Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
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
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Penilaian Berhasil Dikirim!
            </h3>
            <p className="text-gray-600 mb-4">
              Terima kasih telah melakukan penilaian. Anda akan dialihkan ke
              halaman daftar sekolah.
            </p>
            <div className="animate-pulse text-sm text-gray-500">
              Mengalihkan...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
