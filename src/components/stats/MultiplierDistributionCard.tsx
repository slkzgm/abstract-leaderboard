// src/components/stats/MultiplierDistributionCard.tsx
import { useState } from 'react'

interface MultiplierDistributionCardProps {
  data: Record<string, number>
}

export default function MultiplierDistributionCard({ data }: MultiplierDistributionCardProps) {
  const [showAllMultipliers, setShowAllMultipliers] = useState(false)

  // Format numbers with commas using a consistent locale
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  // Sort multipliers by frequency (descending)
  const sortedMultipliers = Object.entries(data).sort((a, b) => {
    // First sort by count (descending)
    if (b[1] !== a[1]) {
      return b[1] - a[1]
    }
    // Then by multiplier value (ascending)
    return parseFloat(a[0]) - parseFloat(b[0])
  })

  // Calculate total users
  const totalUsers = Object.values(data).reduce((sum, count) => sum + count, 0)

  // Show limited multipliers or all
  const multipliersToShow = showAllMultipliers ? sortedMultipliers : sortedMultipliers.slice(0, 5)

  // Get multiplier color based on value
  const getMultiplierColor = (multiplier: string) => {
    const value = parseFloat(multiplier)
    if (value >= 2) return 'from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700'
    if (value >= 1.7) return 'from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700'
    if (value >= 1.3) return 'from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700'
    if (value > 1) return 'from-teal-500 to-green-600 dark:from-teal-600 dark:to-green-700'
    return 'from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700' // 1.0x (base multiplier)
  }

  // Calculate the average multiplier
  const calculateAverageMultiplier = () => {
    const weightedSum = sortedMultipliers.reduce(
      (sum, [multiplier, count]) => sum + parseFloat(multiplier) * count,
      0
    )
    return weightedSum / totalUsers
  }

  const averageMultiplier = calculateAverageMultiplier()

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            XP Multiplier Distribution
          </h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
            Avg: {averageMultiplier.toFixed(2)}x
          </div>
        </div>

        <div className="space-y-5">
          {multipliersToShow.map(([multiplier, count]) => {
            const percentage = (count / totalUsers) * 100

            return (
              <div key={multiplier} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
                    {multiplier}x
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatNumber(count)} users ({percentage.toFixed(2)}%)
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${getMultiplierColor(multiplier)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show more/less button */}
        {sortedMultipliers.length > 5 && (
          <div className="mt-5 text-center">
            <button
              onClick={() => setShowAllMultipliers(!showAllMultipliers)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
            >
              {showAllMultipliers ? (
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
                  Show All ({sortedMultipliers.length} multipliers)
                </>
              )}
            </button>
          </div>
        )}

        {/* Insights section */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Multiplier Insights
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
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
              Most common: <span className="font-medium ml-1">{sortedMultipliers[0]?.[0]}x</span>(
              {((sortedMultipliers[0]?.[1] / totalUsers) * 100).toFixed(2)}% of users)
            </li>
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
              Highest multiplier:{' '}
              <span className="font-medium ml-1">
                {sortedMultipliers.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))[0]?.[0]}x
              </span>
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Users with bonus multiplier:{' '}
              <span className="font-medium ml-1">
                {formatNumber(totalUsers - (data['1.00'] || 0))}
              </span>{' '}
              ({(((totalUsers - (data['1.00'] || 0)) / totalUsers) * 100).toFixed(2)}%)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
