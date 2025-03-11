// src/types/user.ts
export interface User {
  _id: string
  name: string
  walletAddress: string
  hasStreamingAccess: boolean
  totalExperiencePoints: number
  xpMultiplier: number
  globalRank?: number
}

export type SortField = 'totalExperiencePoints' | 'name'
export type SortOrder = 1 | -1

export interface LeaderboardParams {
  limit: number
  skip: number
  sortField: SortField
  sortOrder: SortOrder
  search?: string
}
