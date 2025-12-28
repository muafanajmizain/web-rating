// src/app/Reviewer/DashboardLayout.js

import Sidebar from '../components/ReviewerSidebar';
import ReviewerHeader from '../components/ReviewerHeader';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />  {/* <-- HANYA SATU KALI DI SINI */}
      <div className="ml-64">
        <ReviewerHeader />
        <main className="p-8 bg-gray-100 min-h-screen">{children}</main>
      </div>
    </>
  );
}