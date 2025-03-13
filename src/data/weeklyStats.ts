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

// Data for Week 5 (example with adjusted values)
const week5Data: WeeklyStats = {
  week: 5,
  summary: {
    totalUsers: 956214,
    totalExperiencePoints: 723456789,
    totalExperiencePointsTop1000: 58976543,
  },
  xpStats: {
    minXP: 0,
    maxXP: 325678,
    averageXP: 756.52,
    medianXP: 52.0,
    q1: 0.0,
    q3: 712.0,
    standardDeviation: 2876.41,
  },
  tierDistribution: {
    tier1: 948321,
    tier2: 7825,
    tier3: 68,
    tier4: 0,
  },
  badgeAnalysis: {
    averageBadgesPerUser: 2.89,
    badgeFrequency: {
      'Connect Discord': 478523,
      'Multiply It': 32145,
      'Gigaverse Giga Chad': 21567,
      Witty: 81254,
      'Myriad Master': 265498,
      'The Sock Master': 512,
      'Super Duper': 12456,
      'Connect Twitter / X': 642187,
      'Fund Your Account': 498745,
      'The Trader': 432165,
      'App Voter': 398764,
      Gacha: 65432,
    },
  },
  welcomeTour: {
    completed: 578943,
    completedPercentage: 60.54,
  },
  streamingAccess: {
    count: 1254,
    percentage: 0.13,
  },
  multiplierDistribution: {
    '1.00': 945678,
    '2.33': 32,
    '1.20': 1423,
    '1.25': 1521,
    '1.12': 5876,
    '1.62': 342,
    '1.75': 112,
    '2.25': 8,
    '1.82': 215,
    '1.32': 275,
    '1.70': 653,
  },
}

// Data for Week 4 (example with adjusted values)
const week4Data: WeeklyStats = {
  week: 4,
  summary: {
    totalUsers: 824567,
    totalExperiencePoints: 598765432,
    totalExperiencePointsTop1000: 47856921,
  },
  xpStats: {
    minXP: 0,
    maxXP: 287543,
    averageXP: 726.14,
    medianXP: 45.0,
    q1: 0.0,
    q3: 634.0,
    standardDeviation: 2654.87,
  },
  tierDistribution: {
    tier1: 818765,
    tier2: 5732,
    tier3: 42,
    tier4: 0,
  },
  badgeAnalysis: {
    averageBadgesPerUser: 2.65,
    badgeFrequency: {
      'Connect Discord': 412356,
      'Multiply It': 28765,
      'Gigaverse Giga Chad': 18932,
      Witty: 72345,
      'Myriad Master': 234567,
      'The Sock Master': 387,
      'Super Duper': 9876,
      'Connect Twitter / X': 543216,
      'Fund Your Account': 432156,
      'The Trader': 375432,
      'App Voter': 345678,
      Gacha: 54321,
    },
  },
  welcomeTour: {
    completed: 498765,
    completedPercentage: 60.49,
  },
  streamingAccess: {
    count: 987,
    percentage: 0.12,
  },
  multiplierDistribution: {
    '1.00': 817654,
    '2.33': 21,
    '1.20': 1243,
    '1.25': 1321,
    '1.12': 4563,
    '1.62': 276,
    '1.75': 89,
    '2.25': 5,
    '1.82': 178,
    '1.32': 234,
    '1.70': 543,
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
