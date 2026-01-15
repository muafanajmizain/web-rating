// src/app/Admin/layout.js
"use client";

import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      {children}
    </AuthGuard>
  );
}