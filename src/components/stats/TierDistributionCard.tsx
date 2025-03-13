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

  // Calculate percentages
  const getPercentage = (count: number) => {
    return ((count / totalUsers) * 100).toFixed(2)
  }

  // Get tier color class based on tier
  const getTierColorClass = (tier: number) => {
    switch (tier) {
      case 1:
        return 'bg-amber-700/20 text-amber-700 dark:bg-amber-800/40 dark:text-amber-300'
      case 2:
        return 'bg-gray-300/30 text-gray-700 dark:bg-gray-400/20 dark:text-gray-300'
      case 3:
        return 'bg-yellow-400/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-300'
      case 4:
        return 'bg-sky-400/20 text-sky-700 dark:bg-sky-500/30 dark:text-sky-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
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
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Tier Distribution
        </h3>
        <div className="mt-5 space-y-4">
          {tiers.map(({ tier, count }) => {
            const percentage = parseFloat(getPercentage(count))
            return (
              <div key={tier} className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg mr-2 text-sm font-medium ${getTierColorClass(
                        tier
                      )}`}
                    >
                      {getTierName(tier)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(count)} users
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
