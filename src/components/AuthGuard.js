// src/components/AuthGuard.js
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Role to dashboard path mapping
const ROLE_DASHBOARDS = {
  admin: "/Admin",
  reviewer: "/Reviewer",
  pengelola: "/pengelola-sekolah",
  school: "/pengelola-sekolah",
  sekolah: "/pengelola-sekolah",
  user: "/user",
};

// Allowed paths per role
const ROLE_ALLOWED_PATHS = {
  admin: ["/Admin"],
  reviewer: ["/Reviewer"],
  pengelola: ["/pengelola-sekolah"],
  school: ["/pengelola-sekolah"],
  sekolah: ["/pengelola-sekolah"],
  user: ["/user"],
};

export default function AuthGuard({ children, allowedRoles = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        // No token - redirect to login
        if (!token) {
          router.replace("/login");
          return;
        }

        // Parse user data
        const user = userStr ? JSON.parse(userStr) : null;
        const userRole = user?.role?.toLowerCase() || "";

        // Check if user has allowed role for this route
        if (allowedRoles.length > 0) {
          const hasAllowedRole = allowedRoles.some(
            (role) => role.toLowerCase() === userRole
          );

          if (!hasAllowedRole) {
            // Redirect to user's appropriate dashboard
            const targetDashboard = ROLE_DASHBOARDS[userRole] || "/user";
            router.replace(targetDashboard);
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles, pathname]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  // Not authorized - show nothing while redirecting
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
