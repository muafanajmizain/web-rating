"use client";
import { useLogout } from "@/hooks/useAuth";

function PengelolaHeader({ title = "Pengelola Web Sekolah", onMenuToggle }) {
  const { logout, isLoggingOut } = useLogout();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          {/* Hamburger - mobile only */}
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-gray-600 text-sm">{title}</h1>
        </div>
        <button
          onClick={logout}
          disabled={isLoggingOut}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition duration-200 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default PengelolaHeader;
