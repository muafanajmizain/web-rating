// src/app/user/layout.js
"use client";

import AuthGuard from "@/components/AuthGuard";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

export default function UserRootLayout({ children }) {
  return (
    <AuthGuard allowedRoles={["user"]}>
      <div className="min-h-screen bg-white flex flex-col">
        <UserHeader />

        <main className="flex-grow">{children}</main>

        <UserFooter />
      </div>
    </AuthGuard>
  );
}
