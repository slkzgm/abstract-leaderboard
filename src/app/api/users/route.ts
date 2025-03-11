/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/users/route.ts
import { type NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { SortField, SortOrder, User } from '@/types/user'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get('limit') || '10', 10)
    const skip = Number.parseInt(searchParams.get('skip') || '0', 10)
    const sortField = (searchParams.get('sortField') || 'totalExperiencePoints') as SortField
    const sortOrder = Number.parseInt(searchParams.get('sortOrder') || '-1', 10) as SortOrder
    const search = searchParams.get('search') || ''

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection('xp')

    // Build query
    const query: any = {}
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }

    // Get total count for pagination info
    const total = await collection.countDocuments(query)

    // Get users with sorting and pagination
    const usersFromDb = await collection
      .find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray()

    // If there's a search, compute actual ranks for the users
    let ranksMap: Record<string, number> = {}

    if (search) {
      // Get all user IDs that match the search criteria
      const matchingUserIds = usersFromDb.map(doc => doc._id.toString())

      if (matchingUserIds.length > 0) {
        // For each matching user, find their position in the overall leaderboard
        const rankQueries = matchingUserIds.map(userId => {
          return new Promise<{ userId: string; rank: number }>(async resolve => {
            try {
              // Create a query to get all users with higher scores than this user
              const user = usersFromDb.find(u => u._id.toString() === userId)
              if (!user) {
                resolve({ userId, rank: 0 })
                return
              }

              // Count how many users have a higher value for the sort field
              const comparisonOperator = sortOrder === -1 ? '$gt' : '$lt'
              const higherRankedCount = await collection.countDocuments({
                [sortField]: { [comparisonOperator]: user[sortField] },
              })

              // Rank is position + 1 (counting starts at 0)
              resolve({ userId, rank: higherRankedCount + 1 })
            } catch (err) {
              console.error(`Error calculating rank for user ${userId}:`, err)
              resolve({ userId, rank: 0 })
            }
          })
        })

        const ranks = await Promise.all(rankQueries)
        ranksMap = ranks.reduce(
          (acc, { userId, rank }) => {
            acc[userId] = rank
            return acc
          },
          {} as Record<string, number>
        )
      }
    }

    // Map MongoDB documents to User type
    const users: User[] = usersFromDb.map(doc => ({
      _id: doc._id.toString(),
      name: doc.name || '',
      walletAddress: doc.walletAddress || '',
      hasStreamingAccess: Boolean(doc.hasStreamingAccess),
      totalExperiencePoints: Number(doc.totalExperiencePoints) || 0,
      xpMultiplier: Number(doc.xpMultiplier) || 1,
      globalRank: search ? ranksMap[doc._id.toString()] || 0 : 0,
    }))

    return NextResponse.json({
      users,
      total,
      hasMore: skip + limit < total,
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
