// src/components/UserRow.tsx
import type { User } from '@/types/user'

interface UserRowProps {
  user: User
  rank: number
}

export default function UserRow({ user, rank }: UserRowProps) {
  // Format wallet address to show only first and last few characters
  const formatWallet = (wallet: string) => {
    return `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`
  }

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // Get the appropriate badge class for top 3 ranks
  const getBadgeClass = () => {
    if (rank === 1) return 'rank-badge rank-badge-1'
    if (rank === 2) return 'rank-badge rank-badge-2'
    if (rank === 3) return 'rank-badge rank-badge-3'
    return ''
  }

  return (
    <div className={`leaderboard-row ${rank <= 3 ? 'leaderboard-row-top' : ''}`}>
      <div className="col-span-1 text-center font-semibold">
        {rank <= 3 ? <span className={getBadgeClass()}>{rank}</span> : rank}
      </div>
      <div className="col-span-4 sm:col-span-3 font-medium truncate" title={user.name}>
        {user.name}
      </div>
      <div
        className="col-span-7 sm:col-span-4 text-gray-500 dark:text-gray-400 truncate font-mono text-sm"
        title={user.walletAddress}
      >
        {formatWallet(user.walletAddress)}
      </div>
      <div className="hidden sm:block sm:col-span-1 text-center">
        <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-lg font-medium text-sm">
          {user.xpMultiplier}x
        </span>
      </div>
      <div className="hidden sm:block sm:col-span-1 text-center">
        {user.hasStreamingAccess ? (
          <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg font-medium text-sm">
            Yes
          </span>
        ) : (
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg font-medium text-sm">
            No
          </span>
        )}
      </div>
      <div className="col-span-2 text-right font-semibold text-primary-600 dark:text-primary-400">
        {formatNumber(user.totalExperiencePoints)}
      </div>
    </div>
  )
}
