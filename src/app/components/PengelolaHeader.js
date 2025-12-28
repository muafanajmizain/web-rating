'use client';
import { useState } from 'react';

// PengelolaHeader Component
function PengelolaHeader({ title = "Pengelola Web Sekolah" }) {
  const handleLogout = () => {
    alert('Logout berhasil!');
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-gray-600 text-sm">{title}</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}


export default PengelolaHeader;