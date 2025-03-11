// src/app/page.tsx
import Leaderboard from '@/components/Leaderboard'

export const metadata = {
  title: 'Abstract Exp Leaderboard',
  description: 'View the top Abstract users ranked by experience points',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <Leaderboard />
    </main>
  )
}
