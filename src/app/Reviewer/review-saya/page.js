// src/app/Reviewer/review-saya/page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const schoolsData = [
    {
      id: 1,
      name: "SMA N 1 Purwokerto",
      jenjang: "SMA",
      image: "https://placehold.co/300x150/6B7FD7/ffffff?text=SMA+N+1+Purwokerto",
      url: "https://website-sekolah-project.vercel.app/",
      reviewer: "1/5"
    },
    {
      id: 2,
      name: "SMA IT Al-Irsyad",
      jenjang: "SMA",
      image: "https://placehold.co/300x150/6B7FD7/ffffff?text=SMA+IT+Al-Irsyad",
      url: "https://website-sekolah-project.vercel.app/",
      reviewer: "2/5"
    },
    {
      id: 3,
      name: "MAN 1 Banyumas",
      jenjang: "MAN",
      image: "https://placehold.co/300x150/6B7FD7/ffffff?text=MAN+1+Banyumas",
      url: "https://website-sekolah-project.vercel.app/",
      reviewer: "3/5"
    },
    {
      id: 4,
      name: "SMA N 2 Purwokerto",
      jenjang: "SMA",
      image: "https://placehold.co/300x150/6B7FD7/ffffff?text=SMA+N+2+Purwokerto",
      url: "https://website-sekolah-project.vercel.app/",
      reviewer: "0/5"
    },
    {
      id: 5,
      name: "SMK N 1 Purwokerto",
      jenjang: "SMK",
      image: "https://placehold.co/300x150/6B7FD7/ffffff?text=SMK+N+1+Purwokerto",
      url: "https://website-sekolah-project.vercel.app/",
      reviewer: "4/5"
    }
  ];

  const filtered = schoolsData;

  return (
    <div className="p-6 flex-1 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Daftar Review Saya</h2>

      {/* Container tabel lebih lebar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-6xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-white border-b border-gray-200">
              <tr className="font-semibold text-gray-600">
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Sekolah</th>
                <th className="px-4 py-3 text-center">Jenjang</th>
                <th className="px-4 py-3 text-center">Reviewer</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                    Data kosong, bukan error—tenang.
                  </td>
                </tr>
              ) : (
                filtered.map((school, index) => (
                  <tr key={school.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {school.name}
                      <br />
                      <a
                        href={school.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mt-0.5 inline-block"
                      >
                        {school.url}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {school.jenjang}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {school.reviewer}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/Reviewer/review-saya/detail/${school.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
