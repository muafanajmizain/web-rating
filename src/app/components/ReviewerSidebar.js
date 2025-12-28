'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarReviewer() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/Reviewer',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
      )
    },
    {
      name: 'Data Sekolah',
      path: '/Reviewer/data-sekolah',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
      )
    },
    {
      name: 'Review Saya',
      path: '/Reviewer/review-saya',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'Tanggapan',
      path: '/Reviewer/tanggapan',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'Profil',
      path: '/Reviewer/profil-reviewer',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-sky-400 to-sky-500 text-white h-screen fixed left-0 top-0 z-50">
      {/* Profile */}
      <div className="p-6 text-center border-b border-sky-300">
        <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-3">
          <svg className="w-10 h-10 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="font-bold text-lg">REVIEWER</h2>
        <p className="text-sm text-sky-100">OnTheWeb</p>
      </div>

      {/* Menu */}
      <nav className="mt-6">
        {menuItems.map(item => {
          // ✅ Gunakan logika sederhana: cocokkan path persis
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-6 py-3 transition duration-200 ${
                isActive
                  ? 'bg-sky-600 border-l-4 border-white'
                  : 'hover:bg-sky-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
