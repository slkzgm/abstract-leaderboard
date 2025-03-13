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

  // Create a more structured visualization of the XP distribution
  const minXP = data.minXP
  const q1 = data.q1
  const median = data.medianXP
  const q3 = data.q3
  const maxXP = data.maxXP

  const primaryStats = [
    {
      name: 'Average XP',
      value: formatNumber(data.averageXP, 2),
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    },
    {
      name: 'Median XP',
      value: formatNumber(data.medianXP, 2),
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    },
  ]

  const distributionStats = [
    { name: 'Minimum XP', value: formatNumber(minXP) },
    { name: '1st Quartile (Q1)', value: formatNumber(q1, 2) },
    { name: 'Median', value: formatNumber(median, 2) },
    { name: '3rd Quartile (Q3)', value: formatNumber(q3, 2) },
    { name: 'Maximum XP', value: formatNumber(maxXP) },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Experience Points Distribution
        </h3>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {primaryStats.map(stat => (
            <div key={stat.name} className={`rounded-lg px-4 py-5 ${stat.color}`}>
              <div className="text-sm font-medium mb-1">{stat.name}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Statistics Table */}
        <div className="mt-5 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Distribution Metrics
            </h4>
          </div>
          <div className="px-4 py-2">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-5">
              {distributionStats.map(stat => (
                <div key={stat.name} className="text-center">
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate mb-1">
                    {stat.name}
                  </dt>
                  <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Box Plot Visualization */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Distribution Visualization (Quartiles)
          </h4>

          <div className="relative h-8 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
            {/* The visualization uses a logarithmic scale for better representation */}
            <div
              className="absolute inset-y-0 left-0 bg-blue-200 dark:bg-blue-800"
              style={{ width: '25%' }}
            ></div>
            <div
              className="absolute inset-y-0 left-[25%] bg-blue-300 dark:bg-blue-700"
              style={{ width: '25%' }}
            ></div>
            <div
              className="absolute inset-y-0 left-[50%] bg-blue-400 dark:bg-blue-600"
              style={{ width: '25%' }}
            ></div>
            <div
              className="absolute inset-y-0 left-[75%] bg-blue-500 dark:bg-blue-500"
              style={{ width: '25%' }}
            ></div>

            {/* Labels */}
            <div className="absolute top-full pt-1 left-0 text-xs text-gray-500">Min</div>
            <div className="absolute top-full pt-1 left-[25%] transform -translate-x-1/2 text-xs text-gray-500">
              Q1
            </div>
            <div className="absolute top-full pt-1 left-[50%] transform -translate-x-1/2 text-xs text-gray-500">
              Median
            </div>
            <div className="absolute top-full pt-1 left-[75%] transform -translate-x-1/2 text-xs text-gray-500">
              Q3
            </div>
            <div className="absolute top-full pt-1 right-0 text-xs text-gray-500">Max</div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <strong>Standard Deviation:</strong> {formatNumber(data.standardDeviation, 2)} -
              Measures how spread out the XP values are from the average.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
