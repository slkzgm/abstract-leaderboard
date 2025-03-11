// src/hooks/useInfiniteUsers.ts
'use client'

import { useCallback, useEffect, useState } from 'react'
import type { LeaderboardParams, SortField, SortOrder, User } from '@/types/user'

export function useInfiniteUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [params, setParams] = useState<LeaderboardParams>({
    limit: 20,
    skip: 0,
    sortField: 'totalExperiencePoints',
    sortOrder: -1,
    search: '',
  })

  // Add a separate state to track when we need to reset data
  const [shouldResetData, setShouldResetData] = useState(false)

  const fetchUsers = useCallback(
    async (isInitialFetch = false) => {
      try {
        setLoading(true)
        setError(null)

        const queryParams = new URLSearchParams({
          limit: params.limit.toString(),
          skip: params.skip.toString(),
          sortField: params.sortField,
          sortOrder: params.sortOrder.toString(),
          ...(params.search ? { search: params.search } : {}),
        })

        const response = await fetch(`/api/users?${queryParams}`)

        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = await response.json()

        setUsers(prev => (isInitialFetch ? data.users : [...prev, ...data.users]))
        setHasMore(data.hasMore)

        // Reset shouldResetData after fetching
        if (shouldResetData) {
          setShouldResetData(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    },
    [params, shouldResetData]
  )

  // Effect for sort or search changes
  useEffect(() => {
    // Only reset and fetch when sort field, sort order, or search changes
    // Not when skip changes
    const handleSortOrSearchChange = () => {
      setShouldResetData(true)
      setParams(prev => ({
        ...prev,
        skip: 0,
      }))
    }

    return () => {
      // This cleanup function ensures we don't reset data when unmounting
    }
  }, [params.sortField, params.sortOrder, params.search])

  // Separate effect for fetching data
  useEffect(() => {
    // If we should reset data or it's an initial load (skip is 0), fetch with reset
    if (shouldResetData || params.skip === 0) {
      fetchUsers(true)
    } else if (params.skip > 0) {
      // Otherwise, this is a "load more" operation
      fetchUsers(false)
    }
  }, [params.skip, params.sortField, params.sortOrder, params.search, shouldResetData, fetchUsers])

  // Load more function
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setParams(prev => ({
        ...prev,
        skip: prev.skip + prev.limit,
      }))
    }
  }, [loading, hasMore])

  // Update sort options
  const updateSort = useCallback((field: SortField, order: SortOrder) => {
    setShouldResetData(true)
    setParams(prev => ({
      ...prev,
      sortField: field,
      sortOrder: order,
      skip: 0, // Reset pagination when sorting changes
    }))
  }, [])

  // Update search
  const updateSearch = useCallback((search: string) => {
    setShouldResetData(true)
    setParams(prev => ({
      ...prev,
      search,
      skip: 0, // Reset pagination when search changes
    }))
  }, [])

  return {
    users,
    loading,
    error,
    hasMore,
    loadMore,
    updateSort,
    updateSearch,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
    search: params.search,
  }
}
