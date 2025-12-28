import './globals.css'

export const metadata = {
  title: 'OnTheWeb Admin Dashboard',
  description: 'Admin Dashboard for OnTheWeb',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}