"use client";

import { useState } from "react";
import PengelolaSidebar from "@/app/components/PengelolaSidebar";
import PengelolaHeader from "@/app/components/PengelolaHeader";

export default function DashboardLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <PengelolaSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64 min-h-screen">
        <PengelolaHeader title={title} onMenuToggle={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
