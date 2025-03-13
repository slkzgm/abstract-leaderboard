// src/app/stats/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { WeeklyStats } from '@/types/stats'
import { weekOptions, getStatsByWeek, getLatestWeek } from '@/data/weeklyStats'

// Stats Components
import SummaryCard from '@/components/stats/SummaryCard'
import XpStatsCard from '@/components/stats/XpStatsCard'
import TierDistributionCard from '@/components/stats/TierDistributionCard'
import BadgeAnalysisCard from '@/components/stats/BadgeAnalysisCard'
import MultiplierDistributionCard from '@/components/stats/MultiplierDistributionCard'
import OtherStatsCard from '@/components/stats/OtherStatsCard'

// Loading component
function StatsPageLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Statistics
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Loading statistics...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrapper component that uses useSearchParams
function StatsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get week from URL params or default to the latest week
  const weekParam = searchParams.get('week')
  const initialWeek = weekParam ? parseInt(weekParam, 10) : getLatestWeek()

  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek)
  const [stats, setStats] = useState<WeeklyStats | undefined>(getStatsByWeek(initialWeek))
  const [activeTab, setActiveTab] = useState<string>('overview')

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
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
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

  // Define tabs for navigation
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience Points' },
    { id: 'users', label: 'Users & Tiers' },
    { id: 'engagement', label: 'Engagement' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section with title and week selector */}
        <div className="md:flex md:items-center md:justify-between md:space-x-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Abstract Statistics
            </h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
              Platform metrics and analytics
            </p>
          </div>

          {/* Week selector */}
          <div className="mt-4 md:mt-0">
            <label
              htmlFor="week-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Select Week:
            </label>
            <select
              id="week-select"
              value={selectedWeek}
              onChange={handleWeekChange}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900 dark:text-white"
            >
              {weekOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on selected tab */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SummaryCard data={stats.summary} />
              </div>
              <div>
                <OtherStatsCard
                  welcomeTour={stats.welcomeTour}
                  streamingAccess={stats.streamingAccess}
                />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <XpStatsCard data={stats.xpStats} />
              <MultiplierDistributionCard data={stats.multiplierDistribution} />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TierDistributionCard data={stats.tierDistribution} />
              <BadgeAnalysisCard data={stats.badgeAnalysis} />
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <BadgeAnalysisCard data={stats.badgeAnalysis} />
              </div>
              <OtherStatsCard
                welcomeTour={stats.welcomeTour}
                streamingAccess={stats.streamingAccess}
              />
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Multiplier Distribution (Top 5)
                </h3>
                <div className="space-y-4">
                  {Object.entries(stats.multiplierDistribution)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([multiplier, count]) => {
                      const totalUsers = stats.summary.totalUsers
                      const percentage = (count / totalUsers) * 100

                      return (
                        <div key={multiplier}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {multiplier}x Multiplier
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {percentage.toFixed(2)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-primary-600 dark:bg-primary-500 rounded-full h-2"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main component that wraps the content with Suspense
export default function StatsPage() {
  return (
    <Suspense fallback={<StatsPageLoading />}>
      <StatsPageContent />
    </Suspense>
  )
}
