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

  const statsItems = [
    {
      name: 'Total Users',
      value: formatNumber(data.totalUsers),
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
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
      ),
    },
    {
      name: 'Total Experience Points',
      value: formatNumber(data.totalExperiencePoints),
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      name: 'Top 1000 Users XP',
      value: formatNumber(data.totalExperiencePointsTop1000),
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Platform Summary</h3>

        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
          {statsItems.map(item => (
            <div
              key={item.name}
              className="relative bg-gray-50 dark:bg-gray-700 pt-5 px-4 pb-6 rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute rounded-md p-3 bg-primary-100 dark:bg-primary-900/30">
                  {item.icon}
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline mt-2">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
              </dd>
            </div>
          ))}
        </dl>

        {/* Additional context on the data */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
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
              The top 1000 users represent{' '}
              {((data.totalExperiencePointsTop1000 / data.totalExperiencePoints) * 100).toFixed(2)}%
              of all XP in the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
