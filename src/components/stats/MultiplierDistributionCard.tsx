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

  // Sort multipliers by frequency and then by multiplier value
  const sortedMultipliers = Object.entries(data).sort((a, b) => {
    // First sort by count (descending)
    if (b[1] !== a[1]) {
      return b[1] - a[1]
    }
    // Then sort by multiplier value (ascending)
    return parseFloat(a[0]) - parseFloat(b[0])
  })

  // Calculate total users
  const totalUsers = Object.values(data).reduce((sum, count) => sum + count, 0)

  // Show 5 multipliers by default, or all if toggled
  const multipliersToShow = showAllMultipliers ? sortedMultipliers : sortedMultipliers.slice(0, 5)

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          XP Multiplier Distribution
        </h3>

        <div className="mt-5">
          <ul className="space-y-4">
            {multipliersToShow.map(([multiplier, count]) => {
              const percentage = ((count / totalUsers) * 100).toFixed(2)
              return (
                <li key={multiplier} className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-lg text-sm font-medium">
                        {multiplier}x
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatNumber(count)} users
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </li>
              )
            })}
          </ul>

          {sortedMultipliers.length > 5 && (
            <button
              onClick={() => setShowAllMultipliers(!showAllMultipliers)}
              className="mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium focus:outline-none"
            >
              {showAllMultipliers
                ? 'Show Less'
                : `Show All (${sortedMultipliers.length} multipliers)`}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
