'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header({ title = "Reviewer" }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    // localStorage.removeItem('reviewerToken'); // Opsional
    router.push('/login/loginReviewer');
  };

  return (
    <>
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className="text-gray-600 text-sm">{title}</h1>
          <button
            onClick={openModal}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fadeIn"
          >
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Apakah Anda yakin ingin keluar dari akun?
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  closeModal();
                  handleLogout();
                }}
                className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
