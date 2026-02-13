// src/app/Reviewer/tanggapan/detail/[id]/page.js

"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useReviewsBySchool, useTanggapan, sendResponse } from "@/hooks/useTanggapan";

const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Hari ini";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Kemarin";
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Group messages by date
const groupMessagesByDate = (messages) => {
  const groups = {};
  messages.forEach((msg) => {
    const dateKey = formatDate(msg.created_at);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(msg);
  });
  return groups;
};

export default function Page({ params }) {
  const { id: schoolId } = use(params);
  const messagesEndRef = useRef(null);

  // Get current user from localStorage
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Fetch reviews by school ID
  const {
    reviews: reviewsData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useReviewsBySchool(schoolId);

  // Get the first review for this school (to get review_id for responses)
  const firstReview = reviewsData?.[0];
  const reviewId = firstReview?.review_id || firstReview?.id;

  // Fetch tanggapan/responses using review_id
  const {
    data: responses,
    isLoading: responsesLoading,
    isError: responsesError,
    mutate: mutateResponses,
  } = useTanggapan(reviewId);

  // Message input state
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSending || !reviewId) return;

    setIsSending(true);
    setSendError("");

    try {
      await sendResponse(reviewId, message.trim());
      setMessage("");
      mutateResponses(); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
      setSendError(error.message || "Gagal mengirim pesan");
    } finally {
      setIsSending(false);
    }
  };

  const isLoading = reviewLoading || responsesLoading;
  const isError = reviewError || responsesError;

  // Loading state
  if (isLoading) {
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
  if (isError) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Gagal memuat data</p>
          <Link
            href="/Reviewer/tanggapan"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!reviewsData || reviewsData.length === 0) {
    return (
      <div className="p-8 flex-1">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 font-medium">Review tidak ditemukan</p>
          <Link
            href="/Reviewer/tanggapan"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  // Data from /reviews/school/:schoolId
  const review = firstReview || {};
  const groupedMessages = groupMessagesByDate(responses);

  return (
    <div className="p-8 flex-1 overflow-hidden flex flex-col">
      <h2 className="text-3xl font-bold mb-2">Detail Tanggapan</h2>
      <p className="text-gray-600 mb-6">
        Percakapan dengan pengelola sekolah.
      </p>

      <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
        {/* Header: School & Review Info */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {String(review.nama_sekolah || "S").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-lg">
                {review.nama_sekolah || "Sekolah"}
              </h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Reviewer:</span>{" "}
                  {review.nama_reviewer || "-"}
                </p>
                <p>
                  <span className="font-medium">Tanggal Review:</span>{" "}
                  {formatDate(review.tanggal_review)}
                </p>
                {review.website && (
                  <p>
                    <span className="font-medium">Website:</span>{" "}
                    <a
                      href={review.website.startsWith("http") ? review.website : `https://${review.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {review.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {reviewsData.length} review
              </span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {responses.length === 0 ? (
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p>Belum ada percakapan</p>
              <p className="text-sm mt-1">Mulai percakapan dengan mengirim pesan</p>
            </div>
          ) : (
            Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                {/* Date Separator */}
                <div className="flex justify-center mb-4">
                  <span className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-medium">
                    {date}
                  </span>
                </div>

                {/* Messages for this date */}
                <div className="space-y-3">
                  {msgs.map((msg, index) => {
                    const isCurrentUser = msg.sender_id === currentUser?.id;
                    return (
                      <div
                        key={msg.id || index}
                        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-4 py-3 ${
                            isCurrentUser
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200 text-gray-800"
                          }`}
                        >
                          {!isCurrentUser && (
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              {msg.username || "Unknown"}
                            </p>
                          )}
                          <p className="whitespace-pre-wrap break-words">
                            {msg.pesan}
                          </p>
                          <p
                            className={`text-xs mt-2 text-right ${
                              isCurrentUser ? "text-blue-200" : "text-gray-400"
                            }`}
                          >
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Send Error */}
        {sendError && (
          <div className="px-6 py-2 bg-red-50 border-t border-red-200">
            <p className="text-red-600 text-sm">{sendError}</p>
          </div>
        )}

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t bg-white flex items-center gap-3"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            disabled={isSending}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSending ? (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>

        {/* Back Button */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <Link
            href="/Reviewer/tanggapan"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Kembali ke Daftar Tanggapan
          </Link>
        </div>
      </div>
    </div>
  );
}
