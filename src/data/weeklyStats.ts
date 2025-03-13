// src/data/weeklyStats.ts
import { WeeklyStats, WeekOption } from '@/types/stats'

// Data for Week 6
const week6Data: WeeklyStats = {
  week: 6,
  summary: {
    totalUsers: 1086073,
    totalExperiencePoints: 879564916,
    totalExperiencePointsTop1000: 69532676,
  },
  xpStats: {
    minXP: 0,
    maxXP: 377953,
    averageXP: 809.86,
    medianXP: 60.0,
    q1: 0.0,
    q3: 863.0,
    standardDeviation: 3121.73,
  },
  tierDistribution: {
    tier1: 1075685,
    tier2: 10289,
    tier3: 99,
    tier4: 0,
  },
  badgeAnalysis: {
    averageBadgesPerUser: 3.14,
    badgeFrequency: {
      'Connect Discord': 545631,
      'Multiply It': 38683,
      'Gigaverse Giga Chad': 28364,
      Witty: 94672,
      'Myriad Master': 303301,
      'The Sock Master': 701,
      'Super Duper': 16925,
      'Connect Twitter / X': 730310,
      'Fund Your Account': 583656,
      'The Trader': 501054,
      'App Voter': 484246,
      Gacha: 78063,
    },
  },
  welcomeTour: {
    completed: 681675,
    completedPercentage: 62.77,
  },
  streamingAccess: {
    count: 1719,
    percentage: 0.16,
  },
  multiplierDistribution: {
    '1.00': 1074294,
    '2.33': 47,
    '1.20': 1601,
    '1.25': 1682,
    '1.12': 6591,
    '1.62': 401,
    '1.75': 141,
    '2.25': 11,
    '1.82': 249,
    '1.32': 303,
    '1.70': 753,
  },
}

// Collection of all weekly statistics
export const weeklyStats: WeeklyStats[] = [
  week6Data,
  // Add more weeks as needed
]

// Generate week options for the dropdown selector
export const weekOptions: WeekOption[] = weeklyStats
  .map(stats => ({
    value: stats.week,
    label: `Week ${stats.week}`,
  }))
  .sort((a, b) => b.value - a.value) // Sort by descending week number

// Helper function to get stats for a specific week
export function getStatsByWeek(weekNumber: number): WeeklyStats | undefined {
  return weeklyStats.find(stats => stats.week === weekNumber)
}

// Helper function to get the latest week number
export function getLatestWeek(): number {
  return Math.max(...weeklyStats.map(stats => stats.week))
}
