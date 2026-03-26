import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'OneSelf HealthAI | Healthcare Analytics Dashboard',
  description: 'Healthcare Analytics & Diabetes Risk Intelligence Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-surface">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </body>
    </html>
  )
}
