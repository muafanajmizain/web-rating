'use client';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import { useSummary } from '@/hooks/useSWR';

export default function AdminDashboard() {
  const router = useRouter();
  const { summary, isLoading: loading, isError: error } = useSummary();

  const handleDetail = (school) => {
    router.push(`/Admin/sekolah/detail/${school.id}`);
  };

  // Loading Skeleton for Cards
  const CardSkeleton = () => (
    <div className="bg-gray-200 rounded-lg shadow-md p-5 animate-pulse relative overflow-hidden">
      <div className="relative z-10">
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );

  // Loading Skeleton for Table
  const TableSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-white border-b border-gray-200">
            <tr className="font-semibold text-gray-600">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Nama Sekolah</th>
              <th className="px-6 py-4 text-left">Skor Rata-rata</th>
              <th className="px-6 py-4 text-left">Jumlah Review</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-block h-8 bg-gray-200 rounded-lg w-16"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Admin/Dashboard">
      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {/* Card 1 - Total Sekolah */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-200 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-white text-sm font-medium mb-2 opacity-90">
                  Total Sekolah
                </p>
                <p className="text-3xl font-bold text-white">
                  {summary?.total_schools || 0}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-20">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Card 2 - Request Akun */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-200 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-white text-sm font-medium mb-2 opacity-90">
                  Request Akun
                </p>
                <p className="text-3xl font-bold text-white">
                  {summary?.total_account_requests || 0}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-20">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>

            {/* Card 3 - Total Reviewer */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-200 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-white text-sm font-medium mb-2 opacity-90">
                  Total Reviewer
                </p>
                <p className="text-3xl font-bold text-white">
                  {summary?.total_reviewers || 0}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-20">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== Section Title ===== */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top Ranked Schools</h2>

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <TableSkeleton />}

      {/* ===== Table ===== */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-white border-b border-gray-200">
                <tr className="font-semibold text-gray-600">
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Nama Sekolah</th>
                  <th className="px-6 py-4 text-left">Skor Rata-rata</th>
                  <th className="px-6 py-4 text-left">Jumlah Review</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!summary?.top_ranked_schools ||
                summary.top_ranked_schools.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Tidak ada data sekolah
                    </td>
                  </tr>
                ) : (
                  summary.top_ranked_schools.map((school, index) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {school.nama}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {school.average_score?.toFixed(2) || '0.00'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{school.review_count || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDetail(school)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-semibold transition"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== Footer Info ===== */}
      {!loading && !error && summary?.top_ranked_schools && (
        <div className="mt-4 text-sm text-gray-500">
          Menampilkan {summary.top_ranked_schools.length} sekolah dengan peringkat tertinggi
        </div>
      )}
    </DashboardLayout>
  );
}