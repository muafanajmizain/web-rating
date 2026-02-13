// src/app/Admin/request-akun/page.js
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/Admin/DashboardLayout";
import { useAccountRequests } from "@/hooks/useAccountRequests";

export default function RequestAkunPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pengelola");
  const { requests, isLoading, isError, mutate } = useAccountRequests();

  // Split requests by role
  const pengelolaData = useMemo(
    () => requests.filter((item) => item.role?.toLowerCase() === "pengelola"),
    [requests]
  );
  const reviewerData = useMemo(
    () => requests.filter((item) => item.role?.toLowerCase() === "reviewer"),
    [requests]
  );

  const filteredData = activeTab === "pengelola" ? pengelolaData : reviewerData;

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "accept":
      case "diterima":
        return "bg-green-100 text-green-700";
      case "rejected":
      case "reject":
      case "ditolak":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inactive":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "accept":
        return "Diterima";
      case "rejected":
      case "reject":
        return "Ditolak";
      case "pending":
        return "Pending";
      case "inactive":
        return "Nonaktif";
      default:
        return status || "Pending";
    }
  };

  const handleDetail = (id) => {
    router.push(`/Admin/request-akun/detail/${id}?role=${activeTab}`);
  };

  const tabs = [
    {
      key: "pengelola",
      label: "Pengelola",
      count: pengelolaData.length,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      key: "reviewer",
      label: "Reviewer",
      count: reviewerData.length,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <DashboardLayout title="Admin / Request Akun">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Request Akun</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola permintaan pendaftaran akun pengelola dan reviewer
          </p>
        </div>

        {!isLoading && !isError && (
          <button
            onClick={() => mutate()}
            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
            title="Refresh data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        )}
      </div>

      {/* TABS */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
              {!isLoading && (
                <span
                  className={`ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.key
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CARD TABLE */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-gray-500">Memuat data...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-red-400 mx-auto mb-4"
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
              <p className="text-red-600 mb-4">Gagal memuat data</p>
              <button
                onClick={() => mutate()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filteredData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Belum ada permintaan {activeTab === "pengelola" ? "pengelola" : "reviewer"}
            </div>
          )}

          {/* Reviewer Table */}
          {!isLoading && !isError && filteredData.length > 0 && activeTab === "reviewer" && (
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">No WhatsApp</th>
                  <th className="px-6 py-4 text-left">Pendidikan Terakhir</th>
                  <th className="px-6 py-4 text-left">Profesi</th>
                  <th className="px-6 py-4 text-center">CV</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-medium text-gray-900">
                      {item.nama_lengkap || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.email || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.no_whatsapp || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.pendidikan_terakhir || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.profesi || "-"}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {item.upload_cv ? (
                        <a
                          href={item.upload_cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Lihat CV
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleDetail(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pengelola Table */}
          {!isLoading && !isError && filteredData.length > 0 && activeTab === "pengelola" && (
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-left">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left">Jabatan</th>
                  <th className="px-6 py-4 text-left">No WhatsApp</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-center">Surat Kuasa</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-medium text-gray-900">
                      {item.nama_lengkap || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.jabatan || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.no_whatsapp || "-"}
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {item.email || "-"}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {item.upload_surat_kuasa ? (
                        <a
                          href={item.upload_surat_kuasa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Lihat Surat
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleDetail(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-medium transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
