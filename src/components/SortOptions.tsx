// src/components/SortOptions.tsx
'use client'

import type { SortField, SortOrder } from '@/types/user'

interface SortOptionsProps {
  sortField: SortField
  sortOrder: SortOrder
  onSortChange: (field: SortField, order: SortOrder) => void
}

export default function SortOptions({ sortField, sortOrder, onSortChange }: SortOptionsProps) {
  const handleSortChange = (field: SortField) => {
    // If clicking the same field, toggle order, otherwise set to descending
    const newOrder = field === sortField ? (sortOrder === 1 ? -1 : 1) : -1
    onSortChange(field, newOrder)
  }

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null

    return sortOrder === -1 ? (
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleSortChange('totalExperiencePoints')}
        className={`sort-button ${
          sortField === 'totalExperiencePoints' ? 'sort-button-active' : 'sort-button-inactive'
        }`}
      >
        XP {getSortIcon('totalExperiencePoints')}
      </button>
      <button
        onClick={() => handleSortChange('name')}
        className={`sort-button ${
          sortField === 'name' ? 'sort-button-active' : 'sort-button-inactive'
        }`}
      >
        Name {getSortIcon('name')}
      </button>
      <button
        onClick={() => handleSortChange('xpMultiplier')}
        className={`sort-button ${
          sortField === 'xpMultiplier' ? 'sort-button-active' : 'sort-button-inactive'
        }`}
      >
        Multiplier {getSortIcon('xpMultiplier')}
      </button>
    </div>
  )
}
