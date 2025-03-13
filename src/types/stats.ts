// src/types/statistics.ts
export interface WeeklyStats {
  week: number
  summary: {
    totalUsers: number
    totalExperiencePoints: number
    totalExperiencePointsTop1000: number
  }
  xpStats: {
    minXP: number
    maxXP: number
    averageXP: number
    medianXP: number
    q1: number
    q3: number
    standardDeviation: number
  }
  tierDistribution: {
    tier1: number
    tier2: number
    tier3: number
    tier4: number
  }
  badgeAnalysis: {
    averageBadgesPerUser: number
    badgeFrequency: Record<string, number>
  }
  welcomeTour: {
    completed: number
    completedPercentage: number
  }
  streamingAccess: {
    count: number
    percentage: number
  }
  multiplierDistribution: Record<string, number>
}

export interface WeekOption {
  value: number
  label: string
}
