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

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Other Statistics
        </h3>
        <div className="mt-5 space-y-6">
          {/* Welcome Tour Stats */}
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
              Welcome Tour Completion
            </h4>
            <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(welcomeTour.completed)} users completed
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {welcomeTour.completedPercentage.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full"
                  style={{ width: `${welcomeTour.completedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Streaming Access Stats */}
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
              Streaming Access
            </h4>
            <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(streamingAccess.count)} users have access
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {streamingAccess.percentage.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${streamingAccess.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
