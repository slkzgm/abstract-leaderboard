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

  // Sort badges by frequency and get badges to display
  const sortedBadges = Object.entries(data.badgeFrequency).sort((a, b) => b[1] - a[1])
  const badgesToShow = showAllBadges ? sortedBadges : sortedBadges.slice(0, 5)

  // Calculate total badges awarded
  const totalBadges = Object.values(data.badgeFrequency).reduce((sum, count) => sum + count, 0)

  // Function to get badge color
  const getBadgeColor = (index: number) => {
    const colors = [
      'from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700',
      'from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700',
      'from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700',
      'from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700',
      'from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700',
      'from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-700',
      'from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700',
      'from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Badge Analysis</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
            {data.averageBadgesPerUser.toFixed(2)} badges/user
          </div>
        </div>

        {/* Badge Distribution Visualization */}
        <div className="space-y-5">
          {badgesToShow.map(([badge, count], index) => {
            const percentage = (count / totalBadges) * 100

            return (
              <div key={badge} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${getBadgeColor(index)} mr-2`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-150">
                        {badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    {formatNumber(count)} users ({percentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${getBadgeColor(index)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show more/less button */}
        {sortedBadges.length > 5 && (
          <div className="mt-5 text-center">
            <button
              onClick={() => setShowAllBadges(!showAllBadges)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
            >
              {showAllBadges ? (
                <>
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Show All ({sortedBadges.length} badges)
                </>
              )}
            </button>
          </div>
        )}

        {/* Insights section */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Badge Insights
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Most common badge: <span className="font-medium ml-1">{sortedBadges[0]?.[0]}</span>(
              {formatNumber(sortedBadges[0]?.[1] || 0)} users)
            </li>
            <li className="flex">
              <svg
                className="h-5 w-5 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Total badges awarded:{' '}
              <span className="font-medium ml-1">{formatNumber(totalBadges)}</span>
            </li>
            <li className="flex">
              <svg
                className="h-5 w-5 text-purple-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Unique badge types: <span className="font-medium ml-1">{sortedBadges.length}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
