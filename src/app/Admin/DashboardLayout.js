// Komponen layout utama yang mengatur struktur keseluruhan halaman admin
// Yang mengatur Sidebar + Header + Content
import Sidebar from '../components/AdminSidebar';
import Header from '../components/AdminHeader';

export default function DashboardLayout({ children, title }) {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <Header title={title} />
        
        {/* layouting admin utama */}
        <main className="p-8 bg-gray-100 min-h-screen">
          
          {children}
        </main>
      </div>
    </>
  );
}