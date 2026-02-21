"use client";

import { useState } from "react";
import Sidebar from "../components/ReviewerSidebar";
import ReviewerHeader from "../components/ReviewerHeader";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64 min-h-screen">
        <ReviewerHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
