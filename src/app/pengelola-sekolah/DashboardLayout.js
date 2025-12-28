import PengelolaSidebar from '@/app/components/PengelolaSidebar';
import PengelolaHeader from '@/app/components/PengelolaHeader';

export default function DashboardLayout({ children, title }) {
  return (
    <>
      <div className='ml-64'>
        <PengelolaSidebar />
        <PengelolaHeader title={title} />
        <main className="p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}