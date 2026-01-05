import './globals.css';

export const metadata = {
  title: 'OnTheWeb',
  description: 'Platform Rating Website Sekolah',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
