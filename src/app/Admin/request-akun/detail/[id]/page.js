'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DetailRequestAkun() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || null;
  const role = searchParams?.get('role') || 'reviewer'; // fallback ke reviewer jika tidak ada query

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data detail");
        }

        setDetailData(result.data);
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Status management (untuk tampilan sementara, nanti diganti dengan API update)
  const [currentStatus, setCurrentStatus] = useState(detailData?.status || "pending");

  const handleAccept = async () => {
    if (!confirm("Yakin ingin menerima permintaan ini?")) return;
    // TODO: Panggil API update status ke 'accept'
    setCurrentStatus("accept");
    alert("Permintaan berhasil diterima (simulasi)");
  };

  const handleReject = async () => {
    if (!confirm("Yakin ingin menolak permintaan ini?")) return;
    // TODO: Panggil API update status ke 'reject'
    setCurrentStatus("reject");
    alert("Permintaan berhasil ditolak (simulasi)");
  };

  const handleNonAktif = async () => {
    if (!confirm("Yakin ingin menonaktifkan?")) return;
    // TODO: Panggil API update status ke 'nonaktif'
    setCurrentStatus("nonaktif");
    alert("Akun dinonaktifkan (simulasi)");
  };

  const isReviewer = role === "reviewer";

  if (loading) {
    return (
      <DashboardLayout title="Detail Request Akun">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Memuat detail...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !detailData) {
    return (
      <DashboardLayout title="Detail Request Akun">
        <div className="text-center py-12">
          <h3 className="text-2xl text-red-600 font-semibold mb-4">Terjadi Kesalahan</h3>
          <p className="text-red-600">{error || "Data tidak ditemukan"}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Detail Request Akun">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isReviewer ? "Detail Reviewer" : "Detail Pengelola"}
            </h2>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                currentStatus === "accept"
                  ? "bg-green-100 text-green-800"
                  : currentStatus === "reject"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {currentStatus || "pending"}
            </span>
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
                      className="text-blue-600 hover:underline"
                    >
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
                      className="text-blue-600 hover:underline"
                    >
                      Lihat / Unduh Surat Kuasa
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">Belum diunggah</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={handleAccept}
              disabled={currentStatus === "accept"}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Terima
            </button>
            <button
              onClick={handleReject}
              disabled={currentStatus === "reject"}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tolak
            </button>
            <button
              onClick={handleNonAktif}
              disabled={currentStatus === "nonaktif"}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nonaktifkan
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}