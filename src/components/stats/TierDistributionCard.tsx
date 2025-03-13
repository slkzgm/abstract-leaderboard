// src/components/stats/TierDistributionCard.tsx
import { type WeeklyStats } from '@/types/stats'
import { getTierName } from '@/types/user'

interface TierDistributionCardProps {
  data: WeeklyStats['tierDistribution']
}

export default function TierDistributionCard({ data }: TierDistributionCardProps) {
  // Format numbers with commas using a consistent locale
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  // Calculate total users
  const totalUsers = data.tier1 + data.tier2 + data.tier3 + (data.tier4 || 0)

  // Get tier color class based on tier
  const getTierColorClass = (tier: number) => {
    switch (tier) {
      case 1:
        return 'from-amber-500 to-amber-700 dark:from-amber-700 dark:to-amber-900'
      case 2:
        return 'from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700'
      case 3:
        return 'from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700'
      case 4:
        return 'from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-700'
      default:
        return 'from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700'
    }
  }

  // Get tier badge color class
  const getTierBadgeClass = (tier: number) => {
    switch (tier) {
      case 1:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      case 2:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 3:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 4:
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  // Prepare tier data
  const tiers = [
    { tier: 1, count: data.tier1 },
    { tier: 2, count: data.tier2 },
    { tier: 3, count: data.tier3 },
  ]

  // Add tier 4 if it exists
  if (data.tier4 !== undefined) {
    tiers.push({ tier: 4, count: data.tier4 })
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          User Tier Distribution
        </h3>

        {/* Tier Distribution Chart */}
        <div className="relative pt-1 mb-8">
          <div className="flex h-8 mb-2 overflow-hidden rounded-lg">
            {tiers.map(({ tier, count }) => {
              const percentage = (count / totalUsers) * 100
              return (
                <div
                  key={tier}
                  style={{ width: `${percentage}%` }}
                  className={`bg-gradient-to-r ${getTierColorClass(tier)} relative`}
                >
                  {percentage > 5 && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Tier Details */}
        <div className="space-y-4">
          {tiers.map(({ tier, count }) => {
            const percentage = (count / totalUsers) * 100
            return (
              <div key={tier} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierBadgeClass(tier)} mr-2`}
                    >
                      {getTierName(tier)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(count)} users
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getTierColorClass(tier)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Tier thresholds: Bronze (0 XP), Silver (10,000 XP), Gold (110,000 XP), Platinum
                (1,110,000 XP)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
