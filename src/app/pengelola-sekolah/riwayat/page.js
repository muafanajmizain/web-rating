// src/app/pengelola-sekolah/riwayat/page.js

"use client";
import {
  useNotifications,
  markNotificationAsRead,
} from "@/hooks/useNotifications";
import { useState } from "react";
import DashboardLayout from "../DashboardLayout";

export default function Riwayat() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { notifications, isLoading, isError, mutate } = useNotifications();

  // Format date to Indonesian locale
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleMessageClick = async (message) => {
    setSelectedMessage(message);

    // Mark as read if not already read
    if (!message.isRead) {
      try {
        await markNotificationAsRead(message.id);
        // Refresh the notifications list
        mutate();
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  // Detail view
  if (selectedMessage) {
    return (
      <DashboardLayout title="Detail Notifikasi">
        <div className="min-h-screen">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto py-8">
            <div className="mb-6">
              <button
                onClick={handleBack}
                className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Kembali
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                Detail Pesan / Notifikasi
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatDate(selectedMessage.createdAt)}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedMessage.title || selectedMessage.message}
                </h3>
              </div>

              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.detail ||
                  selectedMessage.message ||
                  "Tidak ada detail tambahan."}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Main table view
  return (
    <DashboardLayout title="Riwayat dan Notifikasi">
      <div className="min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Riwayat / Notifikasi
            </h2>
            {!isLoading && !isError && (
              <button
                onClick={() => mutate()}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm"
                title="Refresh"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-gray-500">Memuat notifikasi...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="text-center">
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
                <p className="text-red-600 mb-4">Gagal memuat notifikasi</p>
                <button
                  onClick={() => mutate()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider w-64">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Pesan / Notifikasi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notifications.length === 0 ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-8 text-center text-gray-500"
                      >
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
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                        Tidak ada notifikasi
                      </td>
                    </tr>
                  ) : (
                    notifications.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleMessageClick(item)}
                        className={`cursor-pointer transition-colors duration-150 ${
                          item.isRead
                            ? "bg-gray-50 hover:bg-gray-100"
                            : "bg-white hover:bg-blue-50"
                        }`}
                      >
                        <td
                          className={`px-6 py-4 text-sm whitespace-nowrap ${
                            item.isRead
                              ? "text-gray-500"
                              : "text-gray-800 font-semibold"
                          }`}
                        >
                          <div className="flex items-center">
                            {!item.isRead && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                            )}
                            {formatDate(item.createdAt)}
                          </div>
                        </td>
                        <td
                          className={`px-6 py-4 text-sm ${
                            item.isRead
                              ? "text-gray-500"
                              : "text-gray-800 font-bold"
                          }`}
                        >
                          {item.title || item.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
