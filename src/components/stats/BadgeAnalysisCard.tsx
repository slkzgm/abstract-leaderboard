// src/components/stats/BadgeAnalysisCard.tsx
import { WeeklyStats } from '@/types/stats'
import { useState } from 'react'

interface BadgeAnalysisCardProps {
  data: WeeklyStats['badgeAnalysis']
}

export default function BadgeAnalysisCard({ data }: BadgeAnalysisCardProps) {
  const [showAllBadges, setShowAllBadges] = useState(false)

  // Format numbers with commas using a consistent locale
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  // Sort badges by frequency and get top badges
  const sortedBadges = Object.entries(data.badgeFrequency).sort((a, b) => b[1] - a[1])

  // Show 5 badges by default, or all if toggled
  const badgesToShow = showAllBadges ? sortedBadges : sortedBadges.slice(0, 5)

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg col-span-1 lg:col-span-2">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Badge Analysis
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Average: <span className="font-semibold">{data.averageBadgesPerUser.toFixed(2)}</span>{' '}
            badges per user
          </div>
        </div>

        <div className="mt-5">
          <ul className="space-y-4">
            {badgesToShow.map(([badge, count]) => {
              return (
                <li key={badge} className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center">
                      <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-lg text-sm font-medium mr-2">
                        {badge}
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatNumber(count)} users
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          {sortedBadges.length > 5 && (
            <button
              onClick={() => setShowAllBadges(!showAllBadges)}
              className="mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium focus:outline-none"
            >
              {showAllBadges ? 'Show Less' : `Show All (${sortedBadges.length} badges)`}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
