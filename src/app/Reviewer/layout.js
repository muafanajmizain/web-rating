// src/app/Reviewer/layout.js
"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardLayout from "./DashboardLayout";

export default function ReviewerLayout({ children }) {
  return (
    <AuthGuard allowedRoles={["reviewer"]}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}