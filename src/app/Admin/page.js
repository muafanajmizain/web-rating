// 'use client';
// import { useState } from 'react';
// import DashboardLayout from '@/app/Admin/DashboardLayout';

// export default function DaftarSekolah() {
//   // Data sekolah
//   const [schools] = useState([
//     { id: 1, name: 'SMA N 1 Purwokerto', status: 'Belum Klaim' },
//     { id: 2, name: 'SMA N 2 Purwokerto', status: 'Sudah Klaim' },
//     { id: 3, name: 'SMA N 3 Purwokerto', status: 'Belum Klaim' },
//     { id: 4, name: 'SMA N 4 Purwokerto', status: 'Sudah Klaim' },
//     { id: 5, name: 'SMA N 5 Purwokerto', status: 'Sudah Klaim' },
//     { id: 6, name: 'SMA N 6 Purwokerto', status: 'Belum Klaim' },
//     { id: 7, name: 'SMA N 7 Purwokerto', status: 'Sudah Klaim' },
//     { id: 8, name: 'SMK N 1 Purwokerto', status: 'Belum Klaim' },
//     { id: 9, name: 'SMK N 2 Purwokerto', status: 'Sudah Klaim' },
//     { id: 10, name: 'SMK N 3 Purwokerto', status: 'Belum Klaim' },
//   ]);

//   const [filteredSchools, setFilteredSchools] = useState(schools);
//   const [statusFilter, setStatusFilter] = useState('');

//   // Handle filter
//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setStatusFilter(value);
    
//     if (value === '') {
//       setFilteredSchools(schools);
//     } else {
//       setFilteredSchools(schools.filter(school => school.status === value));
//     }
//   };

//   // Handle detail
//   const handleDetail = (school) => {
//     alert(`Detail Sekolah:\n\nNama: ${school.name}\nStatus: ${school.status}`);
//   };

//   // Handle tambah sekolah
//   const handleTambahSekolah = () => {
//     alert('Form tambah sekolah akan muncul di sini');
//   };

//   return (
//     <DashboardLayout title="Admin/Daftar Sekolah">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">Daftar Sekolah</h2>
//         <button
//           onClick={handleTambahSekolah}
//           className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           Tambah sekolah
//         </button>
//       </div>

//       {/* Filter Section */}
//       <div className="mb-6">
//         <select 
//           value={statusFilter}
//           onChange={handleFilterChange}
//           className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:border-gray-400 transition-colors min-w-[200px]"
//         >
//           <option value="">Status</option>
//           <option value="Sudah Klaim">Sudah Klaim</option>
//           <option value="Belum Klaim">Belum Klaim</option>
//         </select>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-purple-600 text-white">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">No</th>
//                 <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nama Sekolah</th>
//                 <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Aksi</th>
//                 <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredSchools.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
//                     Tidak ada data sekolah
//                   </td>
//                 </tr>
//               ) : (
//                 filteredSchools.map((school, index) => (
//                   <tr key={school.id} className="hover:bg-gray-50 transition-colors duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                       {school.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button 
//                         onClick={() => handleDetail(school)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
//                       >
//                         Detail
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
//                         school.status === 'Sudah Klaim' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-gray-200 text-gray-700'
//                       }`}>
//                         {school.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Info Footer */}
//       <div className="mt-4 text-sm text-gray-600">
//         Menampilkan {filteredSchools.length} dari {schools.length} sekolah
//       </div>
//     </DashboardLayout>
//   );
// }


'use client';
import { useState } from 'react';
import DashboardLayout from '@/app/Admin/DashboardLayout';
import { schoolData } from '@/data/schoolData';

export default function AdminDashboard() {
  const [schools] = useState(schoolData);
  const [filteredSchools, setFilteredSchools] = useState(schoolData);
  const [statusFilter, setStatusFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    
    if (value === '') {
      setFilteredSchools(schools);
    } else {
      setFilteredSchools(schools.filter(school => school.status === value));
    }
  };

  const handleDetail = (school) => {
    alert(`Detail Sekolah:\n\nRank: ${school.rank}\nNama: ${school.name}\nScore: ${school.score}\nStatus: ${school.status}`);
  };

  return (
    <DashboardLayout title="Admin/User Management">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Website Sekolah</p>
          <p className="text-4xl font-bold text-gray-800">1700</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Pengelola Website</p>
          <p className="text-4xl font-bold text-gray-800">1700</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Reviewer Website</p>
          <p className="text-4xl font-bold text-gray-800">1700</p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-gray-400 transition-colors min-w-[200px]"
        >
          <option value="">Status</option>
          <option value="Sudah Klaim">Sudah Klaim</option>
          <option value="Belum Klaim">Belum Klaim</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama Sekolah</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Penilaian</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Aksi</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data sekolah
                  </td>
                </tr>
              ) : (
                filteredSchools.map((school) => (
                  <tr key={school.rank} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {school.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {school.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {school.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDetail(school)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        Detail
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-4 py-1 rounded text-xs font-semibold ${
                        school.status === 'Sudah Klaim' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}