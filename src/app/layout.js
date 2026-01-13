import './globals.css';
import SWRProvider from '@/components/SWRProvider';

export const metadata = {
  title: 'OnTheWeb',
  description: 'Platform Rating Website Sekolah',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <SWRProvider>
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}
