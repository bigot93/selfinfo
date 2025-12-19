import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A beautiful blog built with Next.js',
  icons: {
    icon: '/selfinfo/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-16">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

