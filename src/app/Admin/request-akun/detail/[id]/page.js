// src/app/Admin/request-akun/detail/[id]/page.js
"use client";

import DashboardLayout from "@/app/Admin/DashboardLayout";
import ConfirmModal from "@/components/ConfirmModal";
import {
  useAccountRequestDetail,
  acceptRequest,
  rejectRequest,
} from "@/hooks/useAccountRequests";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DetailRequestAkun() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || null;
  const role = searchParams?.get("role") || "pengelola";

  const { request, isLoading, isError, mutate } = useAccountRequestDetail(id);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal states
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    confirmVariant: "primary",
    action: null,
  });

  // Success/Error message states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = (actionType, actionName, variant) => {
    const messages = {
      accept: {
        title: "Terima Permintaan",
        message: "Apakah Anda yakin ingin menerima permintaan akun ini?",
        confirmText: "Ya, Terima",
      },
      reject: {
        title: "Tolak Permintaan",
        message: "Apakah Anda yakin ingin menolak permintaan akun ini?",
        confirmText: "Ya, Tolak",
      },
    };

    setModalConfig({
      isOpen: true,
      title: messages[actionType].title,
      message: messages[actionType].message,
      confirmText: messages[actionType].confirmText,
      confirmVariant: variant,
      action: { actionType, actionName },
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirmAction = async () => {
    if (!modalConfig.action) return;

    const { actionType, actionName } = modalConfig.action;

    try {
      setActionLoading(true);
      setErrorMessage("");

      if (actionType === "accept") {
        await acceptRequest(id);
      } else if (actionType === "reject") {
        await rejectRequest(id);
      }

      setSuccessMessage(`Permintaan berhasil ${actionName}!`);
      closeModal();

      // Refresh data
      mutate();
    } catch (err) {
      console.error(`Error ${actionName}:`, err);
      setErrorMessage(err.message || `Terjadi kesalahan saat ${actionName} permintaan`);
      closeModal();
    } finally {
      setActionLoading(false);
    }
  };

  const handleAccept = () => openModal("accept", "diterima", "success");
  const handleReject = () => openModal("reject", "ditolak", "danger");

  const isReviewer = role === "reviewer";

  // Get detail data - handle nested structure
  const detailData = request?.data || request;
  const currentStatus = detailData?.status || "pending";

  // Loading state
  if (isLoading) {
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

  // Error state
  if (isError || !detailData) {
    return (
      <DashboardLayout title="Detail Request Akun">
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
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
          <h3 className="text-2xl text-red-600 font-semibold mb-4">
            Terjadi Kesalahan
          </h3>
          <p className="text-gray-600 mb-6">
            {isError?.message || "Data tidak ditemukan"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => mutate()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      accepted: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Diterima",
      },
      rejected: { bg: "bg-red-100", text: "text-red-800", label: "Ditolak" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800", label: "Nonaktif" },
    };

    const statusStyle = statusMap[status] || statusMap.pending;

    return (
      <span
        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text}`}
      >
        {statusStyle.label}
      </span>
    );
  };

  return (
    <DashboardLayout title="Detail Request Akun">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
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

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
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
              {successMessage}
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-700 hover:text-green-900"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-700 hover:text-red-900"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

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
              <p className="text-gray-900 font-medium">
                {detailData.nama_lengkap || "-"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
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
                  <p className="text-gray-900">
                    {detailData.pendidikan_terakhir || "-"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profesi
                  </label>
                  <p className="text-gray-900">{detailData.profesi || "-"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CV
                  </label>
                  {detailData.upload_cv ? (
                    <a
                      href={detailData.upload_cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
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

          {/* Action Buttons - Only show if status is pending */}
          {currentStatus === "pending" && (
            <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={handleAccept}
                disabled={actionLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Terima
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Tolak
              </button>
            </div>
          )}

          {/* Info if already processed */}
          {currentStatus !== "pending" && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Permintaan ini sudah diproses dengan status:{" "}
                <span className="font-semibold">
                  {getStatusBadge(currentStatus)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmVariant={modalConfig.confirmVariant}
        isLoading={actionLoading}
      />
    </DashboardLayout>
  );
}
