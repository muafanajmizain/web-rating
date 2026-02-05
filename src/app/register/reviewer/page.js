// src/app/register/reviewer/page.js

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterReviewerPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    pendidikan: "",
    profesi: "",
    cv: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    whatsapp: "",
    email: "",
  });

  const validateWhatsApp = (value) => {
    if (!value) return "";
    if (!/^\d+$/.test(value)) {
      return "Nomor WhatsApp harus berupa angka";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value) return "";
    if (!value.includes("@")) {
      return "Email harus menggunakan @";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validasi real-time
    if (name === "whatsapp") {
      setValidationErrors((prev) => ({
        ...prev,
        whatsapp: validateWhatsApp(value),
      }));
    } else if (name === "email") {
      setValidationErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }

    if (showErrors) setShowErrors(false);
    if (errorMessage) setErrorMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("File harus berformat PDF, DOC, atau DOCX");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Ukuran file maksimal 5MB");
        return;
      }
    }
    setFormData((prev) => ({ ...prev, cv: file }));
    if (showErrors) setShowErrors(false);
    if (errorMessage) setErrorMessage("");
  };

  const isFormValid = () => {
    return (
      formData.nama &&
      formData.email &&
      formData.whatsapp &&
      formData.pendidikan &&
      formData.profesi &&
      formData.cv &&
      !validationErrors.whatsapp &&
      !validationErrors.email
    );
  };

  const handleSubmit = async () => {
    // Validasi final semua field
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const emailError = validateEmail(formData.email);

    setValidationErrors({
      whatsapp: whatsappError,
      email: emailError,
    });

    if (!isFormValid() || whatsappError || emailError) {
      setShowErrors(true);
      setErrorMessage(
        "Mohon perbaiki data yang salah atau lengkapi semua data terlebih dahulu!",
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Create FormData for multipart/form-data submission
      const submitData = new FormData();
      submitData.append("role", "reviewer");
      submitData.append("nama_lengkap", formData.nama);
      submitData.append("email", formData.email);
      submitData.append("no_whatsapp", formData.whatsapp);
      submitData.append("pendidikan_terakhir", formData.pendidikan);
      submitData.append("profesi", formData.profesi);
      submitData.append("upload_cv", formData.cv);

      const response = await fetch("/api/requests", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Gagal mengirim pendaftaran");
      }

      setShowModal(true);

      // Auto redirect setelah 3 detik
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error.message || "Terjadi kesalahan saat mengirim pendaftaran",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  return React.createElement(
    "div",
    {
      className:
        "min-h-screen flex items-center justify-center bg-gray-100 p-4",
    },
    // Modal Pop Up
    showModal &&
      React.createElement(
        "div",
        {
          className:
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
          onClick: handleCloseModal,
        },
        React.createElement(
          "div",
          {
            className:
              "bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all",
            onClick: (e) => e.stopPropagation(),
          },
          // Icon Success
          React.createElement(
            "div",
            {
              className: "flex justify-center mb-6",
            },
            React.createElement(
              "div",
              {
                className:
                  "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center",
              },
              React.createElement(
                "svg",
                {
                  className: "w-10 h-10 text-green-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                },
                React.createElement("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M5 13l4 4L19 7",
                }),
              ),
            ),
          ),

          // Title
          React.createElement(
            "h2",
            {
              className: "text-2xl font-bold text-gray-900 text-center mb-4",
            },
            "Pendaftaran Berhasil!",
          ),

          // Message
          React.createElement(
            "p",
            {
              className: "text-gray-600 text-center mb-6 leading-relaxed",
            },
            "Terima kasih telah mendaftar sebagai reviewer. Tim kami akan memverifikasi data Anda dan menghubungi Anda melalui kontak yang telah didaftarkan dalam waktu maksimal 2x24 jam.",
          ),

          // Button
          React.createElement(
            "button",
            {
              onClick: handleCloseModal,
              className:
                "w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-lg",
            },
            "Kembali ke Beranda",
          ),
        ),
      ),

    // Form Container
    React.createElement(
      "div",
      {
        className:
          "flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full",
      },
      // Bagian Kiri
      React.createElement(
        "div",
        {
          className:
            "bg-gradient-to-br from-blue-500 to-blue-600 p-12 md:w-1/2 flex flex-col justify-center items-start text-white relative overflow-hidden",
        },
        // Decorative circles
        React.createElement("div", {
          className:
            "absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full",
        }),
        React.createElement("div", {
          className:
            "absolute bottom-20 left-10 w-24 h-24 bg-white opacity-10 rounded-full",
        }),
        React.createElement("div", {
          className:
            "absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full",
        }),

        // Icon decorations
        React.createElement(
          "div",
          {
            className: "mb-8 flex gap-4",
          },
          React.createElement("div", {
            className: "w-12 h-12 bg-white bg-opacity-20 rounded-lg",
          }),
          React.createElement("div", {
            className: "w-8 h-8 bg-white bg-opacity-20 rounded-lg",
          }),
          React.createElement("div", {
            className: "w-6 h-6 bg-white bg-opacity-20 rounded-full",
          }),
        ),

        React.createElement(
          "h1",
          {
            className: "text-5xl font-bold mb-4 z-10",
          },
          "Ranking OnTheWeb",
        ),

        React.createElement(
          "p",
          {
            className: "text-lg text-blue-100 z-10",
          },
          "Kontribusi Anda untuk Peningkatan Mutu Digital Sekolah",
        ),

        // Bottom decoration
        React.createElement(
          "div",
          {
            className: "mt-12 flex items-center gap-4",
          },
          React.createElement("div", {
            className: "w-16 h-16 bg-cyan-400 rounded-full opacity-70",
          }),
          React.createElement(
            "div",
            {
              className: "flex flex-col gap-2",
            },
            React.createElement("div", {
              className: "w-3 h-3 bg-white opacity-50 rounded-full",
            }),
            React.createElement("div", {
              className: "w-3 h-3 bg-white opacity-50 rounded-full",
            }),
            React.createElement("div", {
              className: "w-3 h-3 bg-white opacity-50 rounded-full",
            }),
          ),
        ),
      ),

      // Bagian Kanan - Form
      React.createElement(
        "div",
        {
          className: "p-12 md:w-1/2 bg-gray-50",
        },
        React.createElement(
          "div",
          {
            className: "max-w-md mx-auto",
          },
          // Error Message
          errorMessage &&
            React.createElement(
              "div",
              {
                className:
                  "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg",
              },
              React.createElement(
                "p",
                {
                  className: "text-red-600 text-sm",
                },
                errorMessage,
              ),
            ),

          // Input Nama
          React.createElement(
            "div",
            {
              className: "mb-6",
            },
            React.createElement(
              "label",
              {
                className: "block text-gray-700 font-medium mb-2",
              },
              "Nama",
            ),
            React.createElement(
              "div",
              {
                className: "relative",
              },
              React.createElement(
                "span",
                {
                  className:
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                },
                "\u{1F464}",
              ),
              React.createElement("input", {
                type: "text",
                name: "nama",
                value: formData.nama,
                onChange: handleChange,
                placeholder: "Masukan nama lengkap anda",
                disabled: isLoading,
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showErrors && !formData.nama
                    ? "border-red-500"
                    : "border-gray-300"
                } ${isLoading ? "bg-gray-100" : ""}`,
              }),
            ),
          ),

          // Input Email
          React.createElement(
            "div",
            {
              className: "mb-6",
            },
            React.createElement(
              "label",
              {
                className: "block text-gray-700 font-medium mb-2",
              },
              "Email",
            ),
            React.createElement(
              "div",
              {
                className: "relative",
              },
              React.createElement(
                "span",
                {
                  className:
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                },
                "\u{2709}\u{FE0F}",
              ),
              React.createElement("input", {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                placeholder: "Masukan Email anda (harus ada @)",
                disabled: isLoading,
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  (showErrors && !formData.email) || validationErrors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } ${isLoading ? "bg-gray-100" : ""}`,
              }),
            ),
            validationErrors.email &&
              React.createElement(
                "p",
                {
                  className: "text-xs text-red-500 mt-1",
                },
                validationErrors.email,
              ),
          ),

          // Input No WhatsApp
          React.createElement(
            "div",
            {
              className: "mb-6",
            },
            React.createElement(
              "label",
              {
                className: "block text-gray-700 font-medium mb-2",
              },
              "No WhatsApp",
            ),
            React.createElement(
              "div",
              {
                className: "relative",
              },
              React.createElement(
                "span",
                {
                  className:
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                },
                "\u{1F4F1}",
              ),
              React.createElement("input", {
                type: "tel",
                name: "whatsapp",
                value: formData.whatsapp,
                onChange: handleChange,
                placeholder: "Masukan no whatsapp (hanya angka)",
                disabled: isLoading,
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  (showErrors && !formData.whatsapp) ||
                  validationErrors.whatsapp
                    ? "border-red-500"
                    : "border-gray-300"
                } ${isLoading ? "bg-gray-100" : ""}`,
              }),
            ),
            validationErrors.whatsapp &&
              React.createElement(
                "p",
                {
                  className: "text-xs text-red-500 mt-1",
                },
                validationErrors.whatsapp,
              ),
          ),

          // Input Pendidikan Terakhir
          React.createElement(
            "div",
            {
              className: "mb-6",
            },
            React.createElement(
              "label",
              {
                className: "block text-gray-700 font-medium mb-2",
              },
              "Pendidikan Terakhir",
            ),
            React.createElement(
              "div",
              {
                className: "relative",
              },
              React.createElement(
                "span",
                {
                  className:
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                },
                "\u{1F393}",
              ),
              React.createElement("input", {
                type: "text",
                name: "pendidikan",
                value: formData.pendidikan,
                onChange: handleChange,
                placeholder: "Masukan pendidikan terakhir anda",
                disabled: isLoading,
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showErrors && !formData.pendidikan
                    ? "border-red-500"
                    : "border-gray-300"
                } ${isLoading ? "bg-gray-100" : ""}`,
              }),
            ),
          ),

          // Input Profesi
          React.createElement(
            "div",
            {
              className: "mb-6",
            },
            React.createElement(
              "label",
              {
                className: "block text-gray-700 font-medium mb-2",
              },
              "Profesi",
            ),
            React.createElement(
              "div",
              {
                className: "relative",
              },
              React.createElement(
                "span",
                {
                  className:
                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                },
                "\u{1F4BC}",
              ),
              React.createElement("input", {
                type: "text",
                name: "profesi",
                value: formData.profesi,
                onChange: handleChange,
                placeholder: "Masukan profesi anda",
                disabled: isLoading,
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showErrors && !formData.profesi
                    ? "border-red-500"
                    : "border-gray-300"
                } ${isLoading ? "bg-gray-100" : ""}`,
              }),
            ),
          ),

          // Upload CV
          React.createElement(
            "div",
            {
              className: "mb-8",
            },
            React.createElement(
              "label",
              {
                className: "block text-gray-700 font-medium mb-2",
              },
              "Upload CV",
            ),
            React.createElement(
              "div",
              {
                className: `flex items-center gap-3 ${showErrors && !formData.cv ? "mb-1" : ""}`,
              },
              React.createElement(
                "button",
                {
                  type: "button",
                  onClick: () => document.getElementById("cv-upload").click(),
                  disabled: isLoading,
                  className: `px-6 py-3 rounded-lg transition-colors font-medium ${
                    showErrors && !formData.cv
                      ? "bg-red-100 text-red-600 border-2 border-red-500"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`,
                },
                "Upload",
              ),
              formData.cv &&
                React.createElement(
                  "span",
                  {
                    className: "text-sm text-gray-600 truncate max-w-xs",
                  },
                  formData.cv.name,
                ),
            ),
            showErrors &&
              !formData.cv &&
              React.createElement(
                "p",
                {
                  className: "text-xs text-red-500 mt-1",
                },
                "File CV wajib diupload",
              ),
            React.createElement(
              "p",
              {
                className: "text-xs text-gray-500 mt-1",
              },
              "Format: PDF, DOC, DOCX (Maks. 5MB)",
            ),
            React.createElement("input", {
              id: "cv-upload",
              type: "file",
              accept: ".pdf,.doc,.docx",
              onChange: handleFileChange,
              disabled: isLoading,
              className: "hidden",
            }),
          ),

          // Tombol Daftar
          React.createElement(
            "button",
            {
              type: "button",
              onClick: handleSubmit,
              disabled: !isFormValid() || isLoading,
              className: `w-full py-3 rounded-lg transition-colors font-semibold text-lg shadow-lg flex items-center justify-center ${
                isFormValid() && !isLoading
                  ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`,
            },
            isLoading
              ? React.createElement(
                  "span",
                  { className: "flex items-center gap-2" },
                  React.createElement(
                    "svg",
                    {
                      className: "animate-spin h-5 w-5 text-white",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                    },
                    React.createElement("circle", {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4",
                    }),
                    React.createElement("path", {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                    }),
                  ),
                  "Mengirim...",
                )
              : "Daftar",
          ),
        ),
      ),
    ),
  );
}
