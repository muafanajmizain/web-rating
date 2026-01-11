// src/app/pengelola-sekolah/riwayat/page.js

'use client';
import { useState } from 'react';
import DashboardLayout from '../DashboardLayout';

export default function Riwayat() {
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Data gabungan riwayat dan notifikasi dengan status read/unread
    const [messages, setMessages] = useState([
        { id: 1, tanggal: '12 November 2025, 14:32:08', pesan: 'Akun anda sudah berhasil dibuat, silahkan lengkapi data sekolah anda', isRead: true, detail: 'Selamat datang! Akun Anda telah berhasil dibuat pada sistem Pengelola Web Sekolah. Silahkan segera melengkapi data sekolah Anda agar dapat mengakses semua fitur yang tersedia. Data yang perlu dilengkapi meliputi profil sekolah, visi misi, data guru dan siswa, serta informasi kontak.' },
        { id: 2, tanggal: '12 November 2025, 14:32:08', pesan: 'Sekolah anda sudah di review, silahkan cek', isRead: false, detail: 'Tim reviewer telah menyelesaikan proses review terhadap data sekolah Anda. Silahkan login ke sistem untuk melihat hasil review dan komentar yang diberikan oleh reviewer. Pastikan untuk melakukan perbaikan jika ada catatan dari reviewer.' },
        { id: 3, tanggal: '12 November 2025, 14:32:08', pesan: 'Reviewer Ahmad Yusuf menambahkan komentar tambahan pada .....', isRead: false, detail: 'Reviewer Ahmad Yusuf telah menambahkan komentar tambahan pada bagian Profil Sekolah. Komentar: "Mohon untuk melengkapi data akreditasi sekolah dan menambahkan dokumentasi foto kegiatan sekolah terbaru. Struktur organisasi juga perlu diperbarui sesuai dengan data tahun ajaran 2025/2026."' },
        { id: 4, tanggal: '12 November 2025, 14:32:08', pesan: 'Akun anda sudah berhasil dibuat silahkan lengkapi data sekolah anda', isRead: true, detail: 'Akun Anda telah aktif dan siap digunakan. Untuk pengalaman terbaik, mohon segera melengkapi semua data yang diperlukan melalui menu Profil Sekolah.' },
        { id: 5, tanggal: '12 November 2025, 14:32:08', pesan: 'Reviewer Ahmad Yusuf menambahkan komentar tambahan pada .....', isRead: false, detail: 'Komentar baru dari Reviewer Ahmad Yusuf pada bagian Fasilitas Sekolah. Mohon untuk menambahkan deskripsi detail mengenai laboratorium komputer dan perpustakaan sekolah.' },
        { id: 6, tanggal: '12 November 2025, 14:32:08', pesan: 'Akun anda sudah berhasil dibuat, silahkan lengkapi data sekolah anda', isRead: true, detail: 'Terima kasih telah mendaftar. Silahkan lengkapi data sekolah untuk melanjutkan proses verifikasi.' },
        { id: 7, tanggal: '12 November 2025, 14:32:08', pesan: 'Akun anda sudah berhasil dibuat silahkan lengkapi data sekolah anda', isRead: true, detail: 'Proses registrasi berhasil. Mohon untuk melengkapi semua informasi sekolah yang diperlukan.' },
        { id: 8, tanggal: '12 November 2025, 14:32:08', pesan: 'Reviewer Ahmad Yusuf menambahkan komentar tambahan pada .....', isRead: false, detail: 'Reviewer Ahmad Yusuf memberikan feedback pada bagian Program Unggulan. Mohon untuk menambahkan dokumentasi pencapaian siswa dan prestasi sekolah dalam 3 tahun terakhir.' },
    ]);

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        // Tandai pesan sebagai sudah dibaca
        setMessages(messages.map(m =>
            m.id === message.id ? { ...m, isRead: true } : m
        ));
    };

    const handleBack = () => {
        setSelectedMessage(null);
    };

    // Jika ada pesan yang dipilih, tampilkan detail
    if (selectedMessage) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-blue-600 text-white py-6 px-8 shadow-md">
                    <h1 className="text-2xl font-bold">Pengelola Web Sekolah</h1>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="mb-6">
                        <button
                            onClick={handleBack}
                            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">Detail Pesan / Notifikasi</h2>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {selectedMessage.tanggal}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{selectedMessage.pesan}</h3>
                        </div>

                        <div className="text-gray-700 leading-relaxed">
                            {selectedMessage.detail}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Tampilan utama tabel
    return (
        <DashboardLayout title="Riwayat dan Notifikasi">
            <div className="min-h-screen">

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Riwayat / Notifikasi</h2>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider w-64">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                                        Pesan / Notifikasi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {messages.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                ) : (
                                    messages.map((item) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => handleMessageClick(item)}
                                            className={`cursor-pointer transition-colors duration-150 ${item.isRead
                                                    ? 'bg-gray-50 hover:bg-gray-100'
                                                    : 'bg-white hover:bg-gray-50'
                                                }`}
                                        >
                                            <td className={`px-6 py-4 text-sm whitespace-nowrap ${item.isRead ? 'text-gray-500' : 'text-gray-800 font-semibold'
                                                }`}>
                                                {item.tanggal}
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${item.isRead ? 'text-gray-500' : 'text-gray-800 font-bold'
                                                }`}>
                                                {item.pesan}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}