// src/app/pengelola-sekolah/profil/page.js

"use client";
import { useSchoolDetailLocal } from "@/hooks/useSWR";
import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";

export default function ProfilPengelola() {
  // User data from localStorage
  const [user, setUser] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Fetch school data if school_id exists
  const {
    school,
    isLoading: isLoadingSchool,
    isError: schoolError,
    mutate: mutateSchool,
  } = useSchoolDetailLocal(schoolId);

  // State for profile form
  const [profile, setProfile] = useState({
    username: "",
    namaSekolah: "",
    npsn: "",
    linkWebsite: "",
    email: "",
    noWhatsapp: "",
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user from localStorage
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setSchoolId(userData?.school_id || null);
        setProfile((prev) => ({
          ...prev,
          username: userData?.username || "",
          role: userData?.role || "",
        }));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  // Update profile when school data loads
  useEffect(() => {
    if (school) {
      setProfile((prev) => ({
        ...prev,
        namaSekolah: school.nama || "",
        npsn: school.npsn || "",
        linkWebsite: school.website || "",
        email: school.email || "",
        noWhatsapp: school.noTelepon || "",
      }));
    }
  }, [school]);

  // Handler for toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
    setSaveError("");
    setSaveSuccess("");
  };

  // Handler for cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setSaveError("");
    setSaveSuccess("");
    // Reset form to original values
    setProfile({
      username: user?.username || "",
      role: user?.role || "",
      namaSekolah: school?.nama || "",
      npsn: school?.npsn || "",
      linkWebsite: school?.website || "",
      email: school?.email || "",
      noWhatsapp: school?.noTelepon || "",
    });
    // Reset password form
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Handler for save profile
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSaveError("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      // Update user username
      if (user?.id && profile.username !== user.username) {
        const userResponse = await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: profile.username,
            role: profile.role,
          }),
        });

        const userData = await userResponse.json();
        if (!userData.success) {
          setSaveError(userData.message || "Gagal memperbarui username");
          return;
        }

        // Update localStorage with new username
        const updatedUser = {
          ...user,
          username: profile.username,
          role: profile.role,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      // Update school data if school_id exists
      if (schoolId) {
        const schoolResponse = await fetch(`/api/schools/${schoolId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nama: profile.namaSekolah,
            npsn: profile.npsn,
            website: profile.linkWebsite,
            email: profile.email,
            noTelepon: profile.noWhatsapp,
          }),
        });

        const schoolData = await schoolResponse.json();
        if (!schoolData.success) {
          setSaveError(schoolData.message || "Gagal memperbarui data sekolah");
          return;
        }

        // Refresh school data
        mutateSchool();
      }

      setSaveSuccess("Profil berhasil diperbarui!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveError("Terjadi kesalahan saat menyimpan profil");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for save password
  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveError("Kata sandi baru dan konfirmasi tidak cocok!");
      return;
    }

    setIsSaving(true);
    setSaveError("");

    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.id) {
        setSaveError("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          password: passwordForm.newPassword,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setSaveError(data.message || "Gagal mengubah kata sandi");
        return;
      }

      setSaveSuccess("Kata sandi berhasil diubah!");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      setSaveError("Terjadi kesalahan saat mengubah kata sandi");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Loading state
  if (isLoadingUser) {
    return (
      <DashboardLayout title="Profil Pengelola">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat data profil...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const hasSchool = !!schoolId;

  return (
    <DashboardLayout title="Profil Pengelola">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Profil Pengelola</h2>
        <p className="text-sm text-gray-600">Data pribadi dan sekolah</p>
      </div>

      {/* Alert Messages */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {saveError}
        </div>
      )}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {saveSuccess}
        </div>
      )}

      {/* Profil Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        {/* Avatar & Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Profil Pengelola</h3>
            <p className="text-xs text-gray-500">Data pribadi dan sekolah</p>
          </div>
        </div>

        {/* Form Profil */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Section: Data Pengguna */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
              Data Pengguna
            </h4>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                disabled={isSaving}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          {/* Section: Data Sekolah */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200 flex items-center justify-between">
              <span>Data Sekolah</span>
              {!hasSchool && (
                <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  Anda belum terhubung dengan sekolah
                </span>
              )}
            </h4>

            {isLoadingSchool && hasSchool ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-sm text-gray-500">
                  Memuat data sekolah...
                </span>
              </div>
            ) : schoolError && hasSchool ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                Gagal memuat data sekolah
              </div>
            ) : (
              <div className="space-y-4">
                {/* Nama Sekolah */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Sekolah
                  </label>
                  <input
                    type="text"
                    name="namaSekolah"
                    value={profile.namaSekolah}
                    onChange={handleChange}
                    disabled={!isEditing || !hasSchool || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing || !hasSchool
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder={
                      hasSchool
                        ? "Masukkan nama sekolah"
                        : "Data tidak tersedia"
                    }
                  />
                </div>

                {/* NPSN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NPSN
                  </label>
                  <input
                    type="text"
                    name="npsn"
                    value={profile.npsn}
                    onChange={handleChange}
                    disabled={!isEditing || !hasSchool || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing || !hasSchool
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder={
                      hasSchool
                        ? "Masukkan NPSN sekolah"
                        : "Data tidak tersedia"
                    }
                  />
                </div>

                {/* Link Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Website
                  </label>
                  <input
                    type="url"
                    name="linkWebsite"
                    value={profile.linkWebsite}
                    onChange={handleChange}
                    disabled={!isEditing || !hasSchool || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing || !hasSchool
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder={
                      hasSchool
                        ? "https://www.sekolahanda.sch.id"
                        : "Data tidak tersedia"
                    }
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing || !hasSchool || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing || !hasSchool
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder={
                      hasSchool
                        ? "email@sekolahanda.sch.id"
                        : "Data tidak tersedia"
                    }
                  />
                </div>

                {/* No WhatsApp */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="noWhatsapp"
                    value={profile.noWhatsapp}
                    onChange={handleChange}
                    disabled={!isEditing || !hasSchool || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing || !hasSchool
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder={
                      hasSchool ? "081234567890" : "Data tidak tersedia"
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition duration-200 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-5.414a2 2 0 012.828 0L18 18.586A2 2 0 0116.586 20H6a2 2 0 01-2-2v-5.586l5.586-5.586z"
                  />
                </svg>
                Ubah Profil
              </button>
            )}
          </div>
        </form>

        {/* Divider */}
        {isEditing && <div className="border-t border-gray-200 my-6"></div>}

        {/* Change Password Section */}
        {isEditing && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Ubah Kata Sandi
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kata Sandi Lama
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  disabled={isSaving}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="Masukkan kata sandi lama"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  disabled={isSaving}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="Masukkan kata sandi baru"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={isSaving}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="Konfirmasi kata sandi baru"
                />
              </div>
            </div>

            {/* Save Password Button */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleSavePassword}
                disabled={
                  isSaving ||
                  !passwordForm.oldPassword ||
                  !passwordForm.newPassword ||
                  !passwordForm.confirmPassword
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  "Ubah Kata Sandi"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
