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

    // Map MongoDB documents to User type
    const users: User[] = usersFromDb.map(doc => ({
      _id: doc._id.toString(),
      name: doc.name || '',
      walletAddress: doc.walletAddress || '',
      hasStreamingAccess: Boolean(doc.hasStreamingAccess),
      totalExperiencePoints: Number(doc.totalExperiencePoints) || 0,
      xpMultiplier: Number(doc.xpMultiplier) || 1,
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
