// src/app/register/pengelola/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPengelolaPage() {
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama: "",
    npsn: "",
    whatsapp: "",
    email: "",
    jabatan: "",
    suratKuasa: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
    npsn: "",
    whatsapp: "",
    email: "",
  });

  const validateUsername = (value) => {
    if (!value) return "";
    if (value.length < 3) return "Username minimal 3 karakter";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "";
    if (value.length < 6) return "Password minimal 6 karakter";
    return "";
  };

  const validateNPSN = (value) => {
    if (!value) return "";
    if (!/^\d+$/.test(value)) return "NPSN harus berupa angka";
    if (value.length !== 8) return "NPSN harus 8 digit";
    return "";
  };

  const validateWhatsApp = (value) => {
    if (!value) return "";
    if (!/^\d+$/.test(value)) return "Nomor WhatsApp harus berupa angka";
    return "";
  };

  const validateEmail = (value) => {
    if (!value) return "";
    if (!value.includes("@")) return "Email harus menggunakan @";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const validators = {
      username: validateUsername,
      password: validatePassword,
      npsn: validateNPSN,
      whatsapp: validateWhatsApp,
      email: validateEmail,
    };

    if (validators[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }

    if (showErrors) setShowErrors(false);
    if (errorMessage) setErrorMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("File harus berformat PDF, DOC, atau DOCX");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Ukuran file maksimal 5MB");
        return;
      }
    }
    setFormData((prev) => ({ ...prev, suratKuasa: file }));
    if (showErrors) setShowErrors(false);
    if (errorMessage) setErrorMessage("");
  };

  const isFormValid = () => {
    return (
      formData.username &&
      formData.password &&
      formData.nama &&
      formData.npsn &&
      formData.whatsapp &&
      formData.email &&
      formData.jabatan &&
      formData.suratKuasa &&
      !validationErrors.username &&
      !validationErrors.password &&
      !validationErrors.npsn &&
      !validationErrors.whatsapp &&
      !validationErrors.email
    );
  };

  const handleSubmit = async () => {
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const npsnError = validateNPSN(formData.npsn);
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const emailError = validateEmail(formData.email);

    setValidationErrors({
      username: usernameError,
      password: passwordError,
      npsn: npsnError,
      whatsapp: whatsappError,
      email: emailError,
    });

    if (!isFormValid() || usernameError || passwordError || npsnError || whatsappError || emailError) {
      setShowErrors(true);
      setErrorMessage("Mohon perbaiki data yang salah atau lengkapi semua data terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const submitData = new FormData();
      submitData.append("role", "pengelola");
      submitData.append("username", formData.username);
      submitData.append("password", formData.password);
      submitData.append("nama_lengkap", formData.nama);
      submitData.append("npsn", formData.npsn);
      submitData.append("no_whatsapp", formData.whatsapp);
      submitData.append("email", formData.email);
      submitData.append("jabatan", formData.jabatan);
      submitData.append("upload_surat_kuasa", formData.suratKuasa);

      const response = await fetch("/api/requests", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Gagal mengirim pendaftaran");
      }

      // Show success toast
      setToast({
        type: "success",
        message: "Pendaftaran berhasil! Akun Anda akan dapat digunakan setelah disetujui oleh Admin.",
      });

      // Auto redirect after 4 seconds
      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.message || "Terjadi kesalahan saat mengirim pendaftaran");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (fieldName, hasValidationError = false) =>
    `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      (showErrors && !formData[fieldName]) || hasValidationError
        ? "border-red-500"
        : "border-gray-300"
    } ${isLoading ? "bg-gray-100" : ""}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div>
              <p className="font-semibold text-sm">{toast.message}</p>
              {toast.type === "success" && (
                <p className="text-xs mt-1 opacity-75">Mengalihkan ke halaman utama...</p>
              )}
            </div>
            <button onClick={() => setToast(null)} className="ml-4 opacity-50 hover:opacity-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-12 md:w-1/2 flex flex-col justify-center items-start text-white relative overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full" />
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-white opacity-10 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full" />

          <div className="mb-8 flex gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg" />
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg" />
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full" />
          </div>

          <h1 className="text-5xl font-bold mb-4 z-10">Ranking OnTheWeb</h1>
          <p className="text-lg text-blue-100 z-10">
            Kontribusi Anda untuk Peningkatan Mutu Digital Sekolah
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="w-16 h-16 bg-cyan-400 rounded-full opacity-70" />
            <div className="flex flex-col gap-2">
              <div className="w-3 h-3 bg-white opacity-50 rounded-full" />
              <div className="w-3 h-3 bg-white opacity-50 rounded-full" />
              <div className="w-3 h-3 bg-white opacity-50 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-12 md:w-1/2 bg-gray-50 overflow-y-auto max-h-screen">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Daftar sebagai Pengelola</h2>
            <p className="text-gray-500 text-sm mb-6">Lengkapi data di bawah untuk mendaftar</p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Username */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukan username (min. 3 karakter)"
                  disabled={isLoading}
                  className={inputClass("username", !!validationErrors.username)}
                />
              </div>
              {validationErrors.username && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukan password (min. 6 karakter)"
                  disabled={isLoading}
                  className={`${inputClass("password", !!validationErrors.password)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>
              )}
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Nama */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukan nama lengkap anda"
                  disabled={isLoading}
                  className={inputClass("nama")}
                />
              </div>
            </div>

            {/* NPSN */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">NPSN</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="npsn"
                  value={formData.npsn}
                  onChange={handleChange}
                  placeholder="Masukan NPSN sekolah (8 digit)"
                  maxLength={8}
                  disabled={isLoading}
                  className={inputClass("npsn", !!validationErrors.npsn)}
                />
              </div>
              {validationErrors.npsn && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.npsn}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukan email anda"
                  disabled={isLoading}
                  className={inputClass("email", !!validationErrors.email)}
                />
              </div>
              {validationErrors.email && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">No WhatsApp</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Masukan no whatsapp (hanya angka)"
                  disabled={isLoading}
                  className={inputClass("whatsapp", !!validationErrors.whatsapp)}
                />
              </div>
              {validationErrors.whatsapp && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.whatsapp}</p>
              )}
            </div>

            {/* Jabatan */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Jabatan</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  placeholder="Masukan jabatan anda"
                  disabled={isLoading}
                  className={inputClass("jabatan")}
                />
              </div>
            </div>

            {/* Upload Surat Kuasa */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Upload Surat Kuasa</label>
              <div className={`flex items-center gap-3 ${showErrors && !formData.suratKuasa ? "mb-1" : ""}`}>
                <button
                  type="button"
                  onClick={() => document.getElementById("surat-kuasa-upload").click()}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                    showErrors && !formData.suratKuasa
                      ? "bg-red-100 text-red-600 border-2 border-red-500"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Upload
                </button>
                {formData.suratKuasa && (
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {formData.suratKuasa.name}
                  </span>
                )}
              </div>
              {showErrors && !formData.suratKuasa && (
                <p className="text-xs text-red-500 mt-1">File Surat Kuasa wajib diupload</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Format: PDF, DOC, DOCX (Maks. 5MB)</p>
              <input
                id="surat-kuasa-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid() || isLoading}
              className={`w-full py-3 rounded-lg transition-colors font-semibold text-lg shadow-lg flex items-center justify-center ${
                isFormValid() && !isLoading
                  ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengirim...
                </span>
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
