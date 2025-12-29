'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';

export default function DetailSekolah() {
  const router = useRouter();
  const params = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      try {
        // Validasi params.id
        if (!params?.id) {
          setError('ID sekolah tidak ditemukan');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Token tidak ditemukan. Silakan login kembali.');
          setLoading(false);
          return;
        }

        console.log('Fetching school with ID:', params.id);

        const response = await fetch(
          `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${params.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log('Response data:', data);

        if (!response.ok || !data.success) {
          setError(data.message || 'Gagal mengambil data sekolah');
          setLoading(false);
          return;
        }

        setSchool(data.data);
      } catch (err) {
        console.error('Error:', err);
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [params?.id]);

  const handleEdit = () => {
    if (!params?.id) {
      alert('ID sekolah tidak valid');
      return;
    }
    console.log('Navigating to edit with ID:', params.id);
    router.push(`/Admin/sekolah/edit/${params.id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!params?.id) {
      alert('ID sekolah tidak valid');
      return;
    }

    setIsDeleting(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `https://ebating-ekarahma2846311-c0u04p9u.leapcell.dev/api/schools/${params.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsDeleting(false);
        setShowDeleteModal(false);
        alert(data.message || 'Gagal menghapus data sekolah');
        return;
      }

      // Success - redirect after short delay
      setTimeout(() => {
        localStorage.setItem('refreshSchoolList', 'true');
        router.push('/Admin/sekolah');
      }, 1500);

    } catch (err) {
      console.error('Error:', err);
      setIsDeleting(false);
      setShowDeleteModal(false);
      alert('Terjadi kesalahan saat menghapus data');
    }
  };

  const handleBack = () => {
    router.push('/Admin/sekolah');
  };

  // Loading State
  if (loading) {
    return (
      <DashboardLayout title="Admin / Detail Sekolah">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-8 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded w-56"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error State
  if (error || !school) {
    return (
      <DashboardLayout title="Admin / Detail Sekolah">
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">{error || 'Data sekolah tidak ditemukan'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Kembali ke Daftar Sekolah
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin / Detail Sekolah">
      <div className="max-w-6xl mx-auto">{/* Diperlebar dari max-w-4xl ke max-w-6xl */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Detail Sekolah
          </h1>
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm font-medium transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Header Visual */}
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 h-64">
            {school.foto && (
              <img 
                src={school.foto} 
                alt={school.nama}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={(e) => {
                  console.error('Image failed to load:', school.foto);
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  {school.nama}
                </h2>
                <p className="text-sm mt-2 opacity-90">
                  NPSN: {school.npsn}
                </p>
                {school.jenjang && (
                  <p className="text-sm mt-2 opacity-80">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded">
                      {school.jenjang}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Detail Information */}
          <div className="p-8">
            {/* Tampilkan foto di detail info juga jika ada */}
            {school.foto && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <span className="block text-sm font-medium text-gray-700 mb-3">Foto Sekolah</span>
                <img 
                  src={school.foto} 
                  alt={school.nama}
                  className="w-full max-w-md h-64 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    console.error('Image failed to load:', school.foto);
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18"%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E';
                  }}
                />
                <p className="text-xs text-gray-400 mt-2">URL: {school.foto}</p>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Nama Sekolah</span>
                <span className="text-sm text-gray-900">: {school.nama || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">NPSN</span>
                <span className="text-sm text-gray-900">: {school.npsn || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Jenjang Sekolah</span>
                <span className="text-sm text-gray-900">: {school.jenjang || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Status Sekolah</span>
                <span className="text-sm text-gray-900">: {school.status_sekolah || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Alamat Lengkap</span>
                <span className="text-sm text-gray-900">: {school.alamat || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Nomor Telepon</span>
                <span className="text-sm text-gray-900">: {school.telepon || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Email Sekolah</span>
                <span className="text-sm text-gray-900">: {school.email || '-'}</span>
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Website Sekolah</span>
                {school.website ? (
                  <span className="text-sm text-blue-600">
                    : <a 
                        href={school.website.startsWith('http') ? school.website : `https://${school.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                      >
                        {school.website}
                      </a>
                  </span>
                ) : (
                  <span className="text-sm text-gray-900">: -</span>
                )}
              </div>

              <div className="flex">
                <span className="w-56 text-sm font-medium text-gray-700">Deskripsi Singkat</span>
                <span className="text-sm text-gray-900">: {school.deskripsi || '-'}</span>
              </div>

              <div className="flex items-center">
                <span className="w-56 text-sm font-medium text-gray-700">Status Klaim</span>
                <span className="text-sm">
                  : <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold ml-1 ${
                    school.is_claimed
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}>
                    {school.is_claimed && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {school.is_claimed ? 'Sudah Klaim' : 'Belum Klaim'}
                  </span>
                </span>
              </div>

              {school.claimed_by && (
                <div className="flex">
                  <span className="w-56 text-sm font-medium text-gray-700">Diklaim oleh</span>
                  <span className="text-sm text-gray-900">: {school.claimed_by}</span>
                </div>
              )}

              {school.created_at && (
                <div className="flex">
                  <span className="w-56 text-sm font-medium text-gray-700">Tanggal Dibuat</span>
                  <span className="text-sm text-gray-900">
                    : {new Date(school.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 justify-end">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              {!isDeleting ? (
                <>
                  <div className="mb-4">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                      <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Hapus Data Sekolah?</h3>
                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Apakah Anda yakin ingin menghapus data "{school?.nama}"? Tindakan ini tidak dapat dibatalkan.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                      <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil Dihapus!</h3>
                  <p className="text-sm text-gray-600">Data sekolah berhasil dihapus</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}