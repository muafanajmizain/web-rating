'use client';
import { useLogout } from '@/hooks/useAuth';

export default function Header({ title = "Admin/User Management" }) {
  const { logout, isLoggingOut } = useLogout();

  return (
     // layouting header
    <div className="bg-white shadow-sm sticky top-0 z-40">

      {/* flexbox layout */}
      <div className="flex items-center justify-between px-8 py-4">

        <h1 className="text-gray-600 text-sm">{title}</h1>
        <button
          onClick={logout}
          disabled={isLoggingOut}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-6 py-2 rounded-lg font-medium transition duration-200 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
