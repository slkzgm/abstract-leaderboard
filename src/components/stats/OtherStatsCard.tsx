// src/components/stats/OtherStatsCard.tsx
import { WeeklyStats } from '@/types/stats'

interface OtherStatsCardProps {
  welcomeTour: WeeklyStats['welcomeTour']
  streamingAccess: WeeklyStats['streamingAccess']
}

export default function OtherStatsCard({ welcomeTour, streamingAccess }: OtherStatsCardProps) {
  // Format numbers with commas using a consistent locale
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  // Create visual representation for progress
  const getProgressColorClass = (percentage: number) => {
    if (percentage >= 75) return 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700'
    if (percentage >= 50) return 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700'
    if (percentage >= 25) return 'from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700'
    return 'from-red-500 to-red-600 dark:from-red-600 dark:to-red-700'
  }

  const stats = [
    {
      name: 'Welcome Tour Completion',
      completed: welcomeTour.completed,
      percentage: welcomeTour.completedPercentage,
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      name: 'Streaming Access',
      completed: streamingAccess.count,
      percentage: streamingAccess.percentage,
      icon: (
        <svg
          className="h-6 w-6 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Platform Engagement
        </h3>

        <div className="space-y-6">
          {stats.map(stat => (
            <div key={stat.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div className="ml-4 flex-1">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {stat.name}
                  </h4>
                  <div className="mt-2 flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.percentage.toFixed(2)}%
                    </div>
                    <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(stat.completed)} users
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="relative">
                      <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200 dark:bg-gray-600">
                        <div
                          style={{ width: `${stat.percentage}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${getProgressColorClass(stat.percentage)}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Streaming access specific details */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2"
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Streaming access is an exclusive feature available to a small percentage of users.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
