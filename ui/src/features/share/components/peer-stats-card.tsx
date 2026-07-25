'use client'

import { IconCircleFilled } from '@tabler/icons-react'
import { PeerStats } from '@/schema/peers.ts'
import clsx from 'clsx'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ClockFadingIcon,
  EthernetPortIcon,
  GaugeIcon,
  WifiHighIcon,
  ActivityIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

interface StatsCardProps {
  isLoading: boolean
  stats: PeerStats | undefined
}

function remainingDays(expireTime: string | null | undefined): number {
  if (!expireTime) return 0
  const expireDate = new Date(expireTime)
  const now = new Date()
  const diffTime = expireDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Each stat row gets its own accent color for a colorful, scannable layout
const rowStyles = {
  status: 'from-sky-500 to-blue-500 shadow-sky-500/30',
  limit: 'from-amber-500 to-orange-500 shadow-amber-500/30',
  expire: 'from-rose-500 to-pink-500 shadow-rose-500/30',
  download: 'from-cyan-500 to-teal-500 shadow-cyan-500/30',
  upload: 'from-indigo-500 to-violet-500 shadow-indigo-500/30',
  total: 'from-fuchsia-500 to-purple-500 shadow-fuchsia-500/30',
}

function IconBadge({
  icon,
  gradient,
}: {
  icon: React.ReactNode
  gradient: string
}) {
  return (
    <span
      className={clsx(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md',
        gradient
      )}
    >
      {icon}
    </span>
  )
}

export default function PeerStatsCard({ isLoading, stats }: StatsCardProps) {
  const status = stats?.is_online ? 'Online' : 'Offline'
  const statusColor = stats?.is_online ? 'text-green-500' : 'text-red-500'

  return (
    <Card className='relative gap-3 overflow-hidden border-0 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/20'>
      <div className='pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl' />

      <CardHeader className='relative flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center gap-2'>
          <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/30'>
            <ActivityIcon className='h-4 w-4' />
          </span>
          <span className='bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent dark:from-amber-300 dark:to-rose-300'>
            Statistics
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='relative flex-1'>
        {isLoading ? (
          <div className='space-y-3'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-1/3' />
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-4 w-1/4' />
            <Skeleton className='h-3 w-full rounded-full' />
          </div>
        ) : (
          <div className='space-y-3 pt-2 text-sm'>
            <div className='flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5'>
              <span className='flex items-center gap-3'>
                <IconBadge
                  icon={<EthernetPortIcon className='h-4 w-4' />}
                  gradient={rowStyles.status}
                />
                Connection Status
              </span>
              <div className='flex items-center gap-2 text-sm font-medium'>
                <IconCircleFilled className={clsx('h-3 w-3', statusColor)} />
                <span className={clsx('capitalize', statusColor)}>
                  {status}
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5'>
              <span className='flex items-center gap-3'>
                <IconBadge
                  icon={<WifiHighIcon className='h-4 w-4' />}
                  gradient={rowStyles.limit}
                />
                Traffic Limit
              </span>
              <span className='font-medium'>
                {stats?.traffic_limit
                  ? `${stats.traffic_limit} GB`
                  : 'Unlimited'}
              </span>
            </div>

            <div className='flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5'>
              <span className='flex items-center gap-3'>
                <IconBadge
                  icon={<ClockFadingIcon className='h-4 w-4' />}
                  gradient={rowStyles.expire}
                />
                Expire Time
              </span>
              <span className='font-medium'>
                {stats?.expire_time
                  ? `${stats?.expire_time} (${remainingDays(stats?.expire_time)} Days)`
                  : 'Never'}
              </span>
            </div>

            <div className='flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5'>
              <span className='flex items-center gap-3'>
                <IconBadge
                  icon={<ArrowDownIcon className='h-4 w-4' />}
                  gradient={rowStyles.download}
                />
                Download
              </span>
              <span className='font-medium'>{stats?.download_usage ?? 0} GB</span>
            </div>

            <div className='flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5'>
              <span className='flex items-center gap-3'>
                <IconBadge
                  icon={<ArrowUpIcon className='h-4 w-4' />}
                  gradient={rowStyles.upload}
                />
                Upload
              </span>
              <span className='font-medium'>{stats?.upload_usage ?? 0} GB</span>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 px-2 py-2 font-semibold'>
              <span className='flex items-center gap-3'>
                <IconBadge
                  icon={<GaugeIcon className='h-4 w-4' />}
                  gradient={rowStyles.total}
                />
                Total Used
              </span>
              <span>
                {stats?.total_usage ?? 0} GB{' '}
                {stats?.traffic_limit ? `(${stats.usage_percent}%)` : ''}
              </span>
            </div>

            {stats?.traffic_limit && (
              <div className='pt-1'>
                <Progress
                  value={Number(stats.usage_percent)}
                  className='h-3 [&>div]:bg-gradient-to-r [&>div]:from-fuchsia-500 [&>div]:to-purple-500'
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
