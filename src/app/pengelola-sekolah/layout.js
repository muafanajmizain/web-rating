// src/app/pengelola-sekolah/layout.js
"use client";

import AuthGuard from "@/components/AuthGuard";

export default function PengelolaSekolahLayout({ children }) {
  return (
    <AuthGuard allowedRoles={["pengelola", "school", "sekolah"]}>
      {children}
    </AuthGuard>
  );
}
