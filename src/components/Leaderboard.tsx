// src/components/Leaderboard.tsx
'use client'

import { useCallback, useRef } from 'react'
import { useInfiniteUsers } from '@/hooks/useInfiniteUsers'
import UserRow from '@/components/UserRow'
import SearchBar from '@/components/SearchBar'
import SortOptions from '@/components/SortOptions'

export default function Leaderboard() {
  const {
    users,
    loading,
    error,
    hasMore,
    loadMore,
    updateSort,
    updateSearch,
    sortField,
    sortOrder,
    search,
  } = useInfiniteUsers()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastUserElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore, loadMore]
  )

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Abstract Leaderboard</h1>
      <div className="mb-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-sm">
        Note: Only users with more than 10,000 experience points (Silver+ tier) are displayed in
        this leaderboard
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <SearchBar value={search || ''} onChange={updateSearch} />
        <SortOptions sortField={sortField} sortOrder={sortOrder} onSortChange={updateSort} />
      </div>

      <div className="leaderboard-card">
        {/* Header */}
        <div className="leaderboard-header">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-4 sm:col-span-3">User</div>
          <div className="col-span-7 sm:col-span-4">Wallet</div>
          <div className="hidden sm:block sm:col-span-1 text-center">Multiplier</div>
          <div className="hidden sm:block sm:col-span-1 text-center">Streaming</div>
          <div className="col-span-2 text-right">XP</div>
        </div>

        {/* User rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.length === 0 && !loading ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">No users found</p>
              <p className="mt-2">Try changing your search criteria</p>
            </div>
          ) : (
            users.map((user, index) => (
              <div key={user._id} ref={index === users.length - 1 ? lastUserElementRef : undefined}>
                <UserRow user={user} rank={index + 1} />
              </div>
            ))
          )}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="p-6 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading more users...</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
