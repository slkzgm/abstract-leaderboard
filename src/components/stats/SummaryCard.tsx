// src/components/stats/SummaryCard.tsx
import { WeeklyStats } from '@/types/stats'

interface SummaryCardProps {
  data: WeeklyStats['summary']
}

export default function SummaryCard({ data }: SummaryCardProps) {
  // Format numbers with commas, using a consistent locale
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Summary Statistics
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden rounded-md p-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              Total Users
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-primary-600 dark:text-primary-400">
              {formatNumber(data.totalUsers)}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden rounded-md p-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              Total Experience Points
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-primary-600 dark:text-primary-400">
              {formatNumber(data.totalExperiencePoints)}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden rounded-md p-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              Top 1000 Experience Points
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-primary-600 dark:text-primary-400">
              {formatNumber(data.totalExperiencePointsTop1000)}
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}
