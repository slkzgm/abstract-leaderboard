// src/types/user.ts
export interface User {
  _id: string
  id: string // Abstract ID
  name: string
  walletAddress: string
  hasStreamingAccess: boolean
  totalExperiencePoints: number
  xpMultiplier: number
  globalRank?: number
  tier: number // 1: bronze, 2: silver, 3: gold, 4: platinum
  badgeCount: number
}

export type SortField = 'totalExperiencePoints' | 'name' | 'xpMultiplier'
export type SortOrder = 1 | -1

export interface LeaderboardParams {
  limit: number
  skip: number
  sortField: SortField
  sortOrder: SortOrder
  search?: string
}

// Helper function to convert tier number to human-readable string
export function getTierName(tier: number): string {
  switch (tier) {
    case 1:
      return 'Bronze'
    case 2:
      return 'Silver'
    case 3:
      return 'Gold'
    case 4:
      return 'Platinum'
    default:
      return 'Unknown'
  }
}
