// src/app/stats/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abstract Statistics',
  description: 'Detailed weekly statistics and metrics',
}

export default function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {children}
    </div>
  )
}
