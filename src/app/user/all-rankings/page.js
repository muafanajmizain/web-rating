// src/app/user/all-rankings/page.js
"use client";
import ConfirmModal from "@/components/ConfirmModal";
import { usePublicSchools } from "@/hooks/useSWR";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function AllRankingsPage() {
  const [jenjang, setJenjang] = useState("semua");
  const [user, setUser] = useState(null);
  const [claimingSchoolId, setClaimingSchoolId] = useState(null);
  const [claimModal, setClaimModal] = useState({
    isOpen: false,
    school: null,
  });
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const {
    schools: rawSchools,
    isLoading: loading,
    isError: error,
    mutate,
  } = usePublicSchools();

  // Get user from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
      }
    } catch (err) {
      console.error("Failed to get user from localStorage:", err);
    }
  }, []);

  // Check if user is pengelola and can claim schools
  const isPengelola = user?.role === "pengelola";
  const userHasSchool = user?.school_id != null;

  // Add rank to schools
  const schools = useMemo(() => {
    return rawSchools.map((school, index) => ({
      ...school,
      rank: index + 1,
    }));
  }, [rawSchools]);

  const filteredSchools =
    jenjang === "semua"
      ? schools
      : schools.filter((school) => school.jenjang === jenjang);

  // Open claim confirmation modal
  const openClaimModal = (school) => {
    setClaimModal({
      isOpen: true,
      school,
    });
  };

  // Close claim modal
  const closeClaimModal = () => {
    setClaimModal({
      isOpen: false,
      school: null,
    });
  };

  // Handle claim school
  const handleClaimSchool = async () => {
    if (!claimModal.school) return;

    const schoolId = claimModal.school.id;
    setClaimingSchoolId(schoolId);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/schools/${schoolId}/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Check for success - backend may return either {success: true} or {status: "success"}
      const isSuccess = data.success === true || data.status === "success";

      if (!response.ok || !isSuccess) {
        // Handle message that could be string or object
        const errorMessage = typeof data.message === "string"
          ? data.message
          : "Gagal mengklaim sekolah";
        throw new Error(errorMessage);
      }

      // Update user in localStorage with new school_id
      const updatedUser = { ...user, school_id: schoolId };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Show success notification
      setNotification({
        show: true,
        type: "success",
        message: `Berhasil mengklaim ${claimModal.school.nama}!`,
      });

      // Refresh schools data
      mutate();

      closeClaimModal();
    } catch (err) {
      console.error("Error claiming school:", err);
      setNotification({
        show: true,
        type: "error",
        message: err.message || "Terjadi kesalahan saat mengklaim sekolah",
      });
      closeClaimModal();
    } finally {
      setClaimingSchoolId(null);
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

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-xl font-bold text-gray-800">
          Top Ranking Website Sekolah
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Daftar lengkap sekolah terbaik berdasarkan penilaian pengguna
        </p>
      </div>

      {/* Pengelola Info Banner */}
      {isPengelola && !userHasSchool && (
        <div className="mx-6 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-blue-800">
                Anda Login sebagai Pengelola
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Anda dapat mengklaim sekolah yang belum diklaim dengan menekan
                tombol &quot;Klaim Sekolah&quot; pada kartu sekolah.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Already claimed school banner */}
      {isPengelola && userHasSchool && (
        <div className="mx-6 mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-green-800">
                Anda sudah mengklaim sekolah
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Anda sudah terhubung dengan sekolah. Kunjungi{" "}
                <Link
                  href="/pengelola-sekolah"
                  className="underline font-medium"
                >
                  dashboard pengelola
                </Link>{" "}
                untuk mengelola sekolah Anda.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Jenjang */}
      <div className="px-6 py-4 bg-white border-b">
        <label className="mr-4 font-medium">Jenjang:</label>
        <select
          value={jenjang}
          onChange={(e) => setJenjang(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="semua">Semua Jenjang</option>
          <option value="SMA/SMK/MA">SMA/SMK/MA</option>
          <option value="SMP/MTS">SMP/MTS</option>
          <option value="SD/MI">SD/MI</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat data sekolah...</p>
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Gagal mengambil data sekolah</p>
            <button
              onClick={() => mutate()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      ) : filteredSchools.length === 0 ? (
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">
              {jenjang === "semua"
                ? "Belum ada data sekolah"
                : `Tidak ada sekolah dengan jenjang ${jenjang}`}
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {school.foto ? (
                    <img
                      src={school.foto}
                      alt={school.nama}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        parent.innerHTML =
                          '<span class="text-gray-400">No Image</span>';
                      }}
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Top Ranking Badge with Verified Icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-block text-sm font-semibold px-3 py-1 rounded ${
                        school.rank === 1
                          ? "bg-blue-100 text-blue-700"
                          : school.rank === 2
                            ? "bg-green-100 text-green-700"
                            : school.rank === 3
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Top Ranking {school.rank}
                    </span>
                    {/* Verified Badge - Centang Biru jika claimed, Abu jika belum */}
                    {school.is_claimed ? (
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        title="Sekolah sudah diklaim"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        title="Sekolah belum diklaim"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  {/* School Name */}
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Nama Sekolah : {school.nama}
                  </h3>

                  {/* Website Link */}
                  <p className="text-sm text-gray-600 mb-3">
                    Link Website :
                    {school.website ? (
                      <a
                        href={
                          school.website.startsWith("http")
                            ? school.website
                            : `https://${school.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1 break-all"
                      >
                        {school.website}
                      </a>
                    ) : (
                      <span className="text-gray-400 ml-1">Tidak tersedia</span>
                    )}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-700 ml-1">
                      {school.rating || "N/A"} / 5
                      {school.total_reviews && (
                        <span className="text-gray-500 font-normal ml-1">
                          ({school.total_reviews})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Tombol Lihat Detail */}
                    <Link
                      href={`/user/school-detail/${school.id}`}
                      className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 text-center transition"
                    >
                      Lihat Detail
                    </Link>

                    {/* Tombol Klaim Sekolah - Only for pengelola without school */}
                    {isPengelola && !userHasSchool && !school.is_claimed && (
                      <button
                        onClick={() => openClaimModal(school)}
                        disabled={claimingSchoolId === school.id}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-sm hover:bg-green-600 text-center transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {claimingSchoolId === school.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Mengklaim...
                          </>
                        ) : (
                          <>
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Klaim Sekolah
                          </>
                        )}
                      </button>
                    )}

                    {/* Show "Sudah Diklaim" badge for claimed schools */}
                    {isPengelola && !userHasSchool && school.is_claimed && (
                      <div className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-md text-sm text-center">
                        Sekolah sudah diklaim
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="py-6 text-center text-gray-500 text-sm">
        {!loading && !error && filteredSchools.length > 0 && (
          <p>Menampilkan {filteredSchools.length} sekolah</p>
        )}
      </div>

      {/* Claim Confirmation Modal */}
      <ConfirmModal
        isOpen={claimModal.isOpen}
        onClose={closeClaimModal}
        onConfirm={handleClaimSchool}
        title="Klaim Sekolah"
        message={
          claimModal.school
            ? `Apakah Anda yakin ingin mengklaim "${claimModal.school.nama}" sebagai sekolah Anda? Setelah diklaim, Anda akan menjadi pengelola sekolah ini dan dapat mengelola data sekolah dari dashboard pengelola.`
            : ""
        }
        confirmText="Ya, Klaim Sekolah"
        cancelText="Batal"
        confirmVariant="success"
        isLoading={claimingSchoolId !== null}
      />
    </div>
  );
}
