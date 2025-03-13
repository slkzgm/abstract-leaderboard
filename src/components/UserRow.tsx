// src/components/UserRow.tsx
import type { User } from '@/types/user'
import { getTierName } from '@/types/user'

interface UserRowProps {
  user: User
  rank: number
  isSearchResult: boolean
}

export default function UserRow({ user, rank, isSearchResult }: UserRowProps) {
  // Format wallet address to show only first and last few characters
  const formatWallet = (wallet: string) => {
    return `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`
  }

  // Format large numbers with commas using a consistent locale
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  // Get the appropriate badge class for top 3 ranks
  const getBadgeClass = (position: number) => {
    if (position === 1) return 'rank-badge rank-badge-1'
    if (position === 2) return 'rank-badge rank-badge-2'
    if (position === 3) return 'rank-badge rank-badge-3'
    return ''
  }

  // Get tier color class based on tier
  const getTierColorClass = (tier: number) => {
    switch (tier) {
      case 1:
        return 'bg-amber-700/20 text-amber-700 dark:bg-amber-800/40 dark:text-amber-300'
      case 2:
        return 'bg-gray-300/30 text-gray-700 dark:bg-gray-400/20 dark:text-gray-300'
      case 3:
        return 'bg-yellow-400/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-300'
      case 4:
        return 'bg-sky-400/20 text-sky-700 dark:bg-sky-500/30 dark:text-sky-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  // Determine which rank to display
  const displayRank = isSearchResult && user.globalRank ? user.globalRank : rank
  const isTopRank = displayRank <= 3

  // Get tier name
  const tierName = getTierName(user.tier)

  // Handler for link clicks, to stop propagation
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className={`leaderboard-row ${isTopRank ? 'leaderboard-row-top' : ''}`}>
      {/* Desktop View */}
      <div
        className="hidden sm:block col-span-1 text-center font-semibold rank-clickable"
        title={user.id}
      >
        {isTopRank ? (
          <span className={getBadgeClass(displayRank)}>{displayRank}</span>
        ) : (
          displayRank
        )}
      </div>
      <div className="hidden sm:block col-span-2 font-medium truncate" title={user.name}>
        <a
          href={`https://portal.abs.xyz/profile/${user.walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:underline"
          onClick={handleLinkClick}
        >
          {user.name}
        </a>
      </div>
      <div
        className="hidden sm:block col-span-3 text-gray-500 dark:text-gray-400 truncate font-mono text-sm"
        title={user.walletAddress}
      >
        <a
          href={`https://abscan.org/address/${user.walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
          onClick={handleLinkClick}
        >
          {formatWallet(user.walletAddress)}
        </a>
      </div>
      <div className="hidden sm:block col-span-1 text-center">
        <span
          className={`px-2 py-1 rounded-lg font-medium text-sm ${getTierColorClass(user.tier)}`}
        >
          {tierName}
        </span>
      </div>
      <div className="hidden sm:block col-span-1 text-center">
        <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-lg font-medium text-sm">
          {user.xpMultiplier}x
        </span>
      </div>
      <div className="hidden sm:block col-span-1 text-center">
        <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-lg font-medium text-sm">
          {user.badgeCount}
        </span>
      </div>
      <div className="hidden sm:block col-span-1 text-center">
        {user.hasStreamingAccess ? (
          <a
            href={`https://portal.abs.xyz/stream/${user.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            onClick={handleLinkClick}
          >
            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg font-medium text-sm hover:bg-green-200 dark:hover:bg-green-800/40">
              Yes
            </span>
          </a>
        ) : (
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg font-medium text-sm">
            No
          </span>
        )}
      </div>
      <div className="hidden sm:block col-span-2 text-right font-semibold text-primary-600 dark:text-primary-400">
        {formatNumber(user.totalExperiencePoints)}
      </div>

      {/* Mobile View */}
      <div
        className="sm:hidden col-span-2 text-center font-semibold rank-clickable"
        title={user.id}
      >
        {isTopRank ? (
          <span className={getBadgeClass(displayRank)}>{displayRank}</span>
        ) : (
          displayRank
        )}
      </div>
      <div className="sm:hidden col-span-10 flex flex-col">
        <div className="flex justify-between">
          <a
            href={`https://portal.abs.xyz/profile/${user.walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold truncate text-primary-600 dark:text-primary-400 hover:underline"
            onClick={handleLinkClick}
          >
            {user.name}
          </a>
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            {formatNumber(user.totalExperiencePoints)}
          </span>
        </div>
        <div className="text-gray-500 dark:text-gray-400 truncate font-mono text-sm mt-1">
          <a
            href={`https://abscan.org/address/${user.walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
            onClick={handleLinkClick}
          >
            {formatWallet(user.walletAddress)}
          </a>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <span className={`px-2 py-0.5 rounded-md text-xs ${getTierColorClass(user.tier)}`}>
            {tierName}
          </span>
          <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-md text-xs">
            {user.xpMultiplier}x
          </span>
          <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md text-xs">
            {user.badgeCount} Badges
          </span>
          {user.hasStreamingAccess && (
            <a
              href={`https://portal.abs.xyz/stream/${user.name}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-md text-xs hover:bg-green-200 dark:hover:bg-green-800/40">
                Streaming
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
