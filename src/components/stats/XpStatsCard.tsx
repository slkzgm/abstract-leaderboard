// src/components/stats/XpStatsCard.tsx
import { WeeklyStats } from '@/types/stats'

interface XpStatsCardProps {
  data: WeeklyStats['xpStats']
}

export default function XpStatsCard({ data }: XpStatsCardProps) {
  // Format numbers with commas and specified decimal places using a consistent locale
  const formatNumber = (num: number, decimalPlaces = 0) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    })
  }

  const statItems = [
    { label: 'Minimum XP', value: formatNumber(data.minXP) },
    { label: 'Maximum XP', value: formatNumber(data.maxXP) },
    { label: 'Average XP', value: formatNumber(data.averageXP, 2) },
    { label: 'Median XP', value: formatNumber(data.medianXP, 2) },
    { label: '1st Quartile (Q1)', value: formatNumber(data.q1, 2) },
    { label: '3rd Quartile (Q3)', value: formatNumber(data.q3, 2) },
    { label: 'Standard Deviation', value: formatNumber(data.standardDeviation, 2) },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          XP Statistics
        </h3>
        <div className="mt-5">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            {statItems.map(item => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-md">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {item.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
