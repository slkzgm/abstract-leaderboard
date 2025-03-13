// src/app/stats/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { WeeklyStats } from '@/types/stats'
import { weekOptions, getStatsByWeek, getLatestWeek } from '@/data/weeklyStats'
import SummaryCard from '@/components/stats/SummaryCard'
import XpStatsCard from '@/components/stats/XpStatsCard'
import TierDistributionCard from '@/components/stats/TierDistributionCard'
import BadgeAnalysisCard from '@/components/stats/BadgeAnalysisCard'
import MultiplierDistributionCard from '@/components/stats/MultiplierDistributionCard'
import OtherStatsCard from '@/components/stats/OtherStatsCard'

export default function StatsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get week from URL params or default to the latest week
  const weekParam = searchParams.get('week')
  const initialWeek = weekParam ? parseInt(weekParam, 10) : getLatestWeek()

  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek)
  const [stats, setStats] = useState<WeeklyStats | undefined>(getStatsByWeek(initialWeek))

  // Update the URL when the selected week changes
  useEffect(() => {
    router.push(`/stats?week=${selectedWeek}`, { scroll: false })
    setStats(getStatsByWeek(selectedWeek))
  }, [selectedWeek, router])

  // Handle week change
  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const week = parseInt(event.target.value, 10)
    setSelectedWeek(week)
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Statistics
            </h1>
            <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              No data available for week {selectedWeek}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Abstract Statistics
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Detailed platform statistics and metrics
          </p>

          {/* Week selector */}
          <div className="mt-6 inline-block">
            <label
              htmlFor="week-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Week:
            </label>
            <select
              id="week-select"
              value={selectedWeek}
              onChange={handleWeekChange}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900 dark:text-gray-100"
            >
              {weekOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid layout for stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard data={stats.summary} />
          <XpStatsCard data={stats.xpStats} />
          <TierDistributionCard data={stats.tierDistribution} />
          <BadgeAnalysisCard data={stats.badgeAnalysis} />
          <MultiplierDistributionCard data={stats.multiplierDistribution} />
          <OtherStatsCard welcomeTour={stats.welcomeTour} streamingAccess={stats.streamingAccess} />
        </div>
      </div>
    </div>
  )
}
