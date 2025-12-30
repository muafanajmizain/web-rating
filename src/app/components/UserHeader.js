// src/app/User/components/UserHeader.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/user" className="flex items-center gap-2">
            <Image
              src="/images/rate-logo.png"
              alt="WebRanking Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-blue-600">OnTheWeb</span>
          </Link>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/user" 
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Beranda
            </Link>
            <Link 
              href="/user/all-rankings" 
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Sekolah
            </Link>
            <Link 
              href="/user/about" 
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              About Us
            </Link>
            <Link
              href="/user/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg border border-gray-100">
            <Link
              href="/user"
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href="/user/all-rankings"
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sekolah
            </Link>
            <Link
              href="/user/about"
              className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/user/contact"
              className="block mx-4 mt-2 px-4 py-3 text-center bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}