'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DetailRequestAkun() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || null;
  const role = searchParams?.get('role') || 'pengelola'; // fallback ke pengelola

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("ID tidak ditemukan");
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const res = await fetch("/api/detailrequestakun", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        });

        const result = await res.json();

        console.log("Response dari API:", result); // Debug log

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data detail");
        }

        setDetailData(result.data);
        setCurrentStatus(result.data?.status || "pending");
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleUpdateStatus = async (newStatus, actionName) => {
    if (!confirm(`Yakin ingin ${actionName} permintaan ini?`)) return;

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const res = await fetch("/api/updaterequestakun", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          id, 
          status: newStatus 
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || `Gagal ${actionName} permintaan`);
      }

      setCurrentStatus(newStatus);
      alert(`Permintaan berhasil ${actionName}!`);
      
      // Refresh data setelah update
      window.location.reload();
    } catch (err) {
      console.error(`Error ${actionName}:`, err);
      alert(err.message || `Terjadi kesalahan saat ${actionName} permintaan`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAccept = () => handleUpdateStatus("accepted", "menerima");
  const handleReject = () => handleUpdateStatus("rejected", "menolak");
  const handleNonAktif = () => handleUpdateStatus("inactive", "menonaktifkan");

  const isReviewer = role === "reviewer";

  if (loading) {
    return (
      <DashboardLayout title="Detail Request Akun">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat detail...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !detailData) {
    return (
      <DashboardLayout title="Detail Request Akun">
        <div className="text-center py-12">
          <h3 className="text-2xl text-red-600 font-semibold mb-4">Terjadi Kesalahan</h3>
          <p className="text-red-600 mb-6">{error || "Data tidak ditemukan"}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
      accepted: { bg: "bg-green-100", text: "text-green-800", label: "Diterima" },
      rejected: { bg: "bg-red-100", text: "text-red-800", label: "Ditolak" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800", label: "Nonaktif" },
    };

    const statusStyle = statusMap[status] || statusMap.pending;
    
    return (
      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
        {statusStyle.label}
      </span>
    );
  };

  return (
    <DashboardLayout title="Detail Request Akun">
      <div className="max-w-2xl mx-auto">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
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
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span className="font-medium">Kembali</span>
        </button>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isReviewer ? "Detail Reviewer" : "Detail Pengelola"}
            </h2>
            {getStatusBadge(currentStatus)}
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <p className="text-gray-900 font-medium">{detailData.nama_lengkap || "-"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{detailData.email || "-"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No WhatsApp
              </label>
              <p className="text-gray-900">{detailData.no_whatsapp || "-"}</p>
            </div>

            {isReviewer ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pendidikan Terakhir
                  </label>
                  <p className="text-gray-900">{detailData.pendidikan_terakhir || "-"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profesi
                  </label>
                  <p className="text-gray-900">{detailData.profesi || "-"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CV</label>
                  {detailData.upload_cv ? (
                    <a
                      href={detailData.upload_cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Lihat / Unduh CV
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">Belum diunggah</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jabatan
                  </label>
                  <p className="text-gray-900">{detailData.jabatan || "-"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surat Kuasa
                  </label>
                  {detailData.upload_surat_kuasa ? (
                    <a
                      href={detailData.upload_surat_kuasa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Lihat / Unduh Surat Kuasa
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">Belum diunggah</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action Buttons - Hanya tampil jika status pending */}
          {currentStatus === "pending" && (
            <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={handleAccept}
                disabled={actionLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {actionLoading ? "Memproses..." : "Terima"}
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {actionLoading ? "Memproses..." : "Tolak"}
              </button>
              <button
                onClick={handleNonAktif}
                disabled={actionLoading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {actionLoading ? "Memproses..." : "Nonaktifkan"}
              </button>
            </div>
          )}

          {/* Info jika sudah diproses */}
          {currentStatus !== "pending" && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Permintaan ini sudah diproses dengan status: <span className="font-semibold">{getStatusBadge(currentStatus)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}