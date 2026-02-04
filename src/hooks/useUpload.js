// src/hooks/useUpload.js
import { useState } from "react";

/**
 * Global hook for file upload
 * @returns {Object} - { uploadFile, isUploading, error, reset }
 */
export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Upload a file to the server
   * @param {File} file - The file to upload
   * @param {string} kategori - Category for the file (e.g., 'school', 'profile', 'banner')
   * @returns {Promise<{success: boolean, path?: string, error?: string}>}
   */
  const uploadFile = async (file, kategori = "general") => {
    setIsUploading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      // Validate file
      if (!file) {
        throw new Error("File tidak boleh kosong");
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("Ukuran file maksimal 5MB");
      }

      // Validate file type for images
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format file harus JPG, PNG, GIF, atau WebP");
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("kategori", kategori);

      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Gagal mengupload file");
      }

      return {
        success: true,
        path: data.data.path,
        id: data.data.id,
      };
    } catch (err) {
      const errorMessage = err.message || "Terjadi kesalahan saat mengupload file";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Reset error state
   */
  const reset = () => {
    setError(null);
  };

  return {
    uploadFile,
    isUploading,
    error,
    reset,
  };
}

/**
 * Standalone function to upload file (without hook)
 * @param {File} file - The file to upload
 * @param {string} kategori - Category for the file
 * @returns {Promise<{success: boolean, path?: string, error?: string}>}
 */
export async function uploadFileAsync(file, kategori = "general") {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    if (!file) {
      throw new Error("File tidak boleh kosong");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("Ukuran file maksimal 5MB");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Format file harus JPG, PNG, GIF, atau WebP");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("kategori", kategori);

    const response = await fetch("/api/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Gagal mengupload file");
    }

    return {
      success: true,
      path: data.data.path,
      id: data.data.id,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan saat mengupload file",
    };
  }
}
