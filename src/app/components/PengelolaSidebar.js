'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PengelolaSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/pengelola-sekolah', 
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
      )
    },
    { 
      name: 'Data Sekolah', 
      path: '/pengelola-sekolah/data-sekolah', 
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
      )
    },
    { 
      name: 'Riwayat', 
      path: '/pengelola-sekolah/riwayat', 
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
      )
    },
    { 
      name: 'Profil', 
      path: '/pengelola-sekolah/profil', 
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
      )
    },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-sky-400 to-sky-500 text-white h-screen fixed left-0 top-0 z-50">
      <div className="p-6 text-center border-b border-sky-300">
        <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-3">
          <svg className="w-10 h-10 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        </div>
        <h2 className="font-bold text-lg">Pengelola</h2>
        <p className="text-sm text-sky-100">Web Sekolah</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
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
    </div>
  );
}