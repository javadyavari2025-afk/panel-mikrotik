import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type Accent = 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan'

const accentStyles: Record<Accent, { icon: string; glow: string; bg: string }> = {
  violet: {
    icon: 'from-violet-500 to-purple-500 shadow-violet-500/30',
    glow: 'bg-violet-500/20',
    bg: 'from-violet-500/10 via-transparent to-transparent',
  },
  emerald: {
    icon: 'from-emerald-500 to-teal-500 shadow-emerald-500/30',
    glow: 'bg-emerald-500/20',
    bg: 'from-emerald-500/10 via-transparent to-transparent',
  },
  amber: {
    icon: 'from-amber-500 to-orange-500 shadow-amber-500/30',
    glow: 'bg-amber-500/20',
    bg: 'from-amber-500/10 via-transparent to-transparent',
  },
  rose: {
    icon: 'from-rose-500 to-pink-500 shadow-rose-500/30',
    glow: 'bg-rose-500/20',
    bg: 'from-rose-500/10 via-transparent to-transparent',
  },
  cyan: {
    icon: 'from-cyan-500 to-sky-500 shadow-cyan-500/30',
    glow: 'bg-cyan-500/20',
    bg: 'from-cyan-500/10 via-transparent to-transparent',
  },
}

type HighlightStatsCardProps = {
  title: string
  icon: ReactNode
  value: number | string | undefined
  suffix?: string
  isLoading: boolean
  action?: ReactNode
  accent?: Accent
}

export function HighlightStatsCard({
  title,
  icon,
  value,
  suffix,
  isLoading,
  action,
  accent = 'cyan',
}: HighlightStatsCardProps) {
  let displayValue: string | number = '-'
  if (value !== undefined && value !== null && value !== '') {
    displayValue = suffix ? `${value} ${suffix}` : value
  }
  const styles = accentStyles[accent]

  return (
    <Card
      className={`relative overflow-hidden border-border/60 bg-gradient-to-br py-0 transition-transform duration-200 hover:-translate-y-0.5 ${styles.bg}`}
    >
      <div
        className={`pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl ${styles.glow}`}
      />
      <CardContent className='relative flex items-center justify-between gap-5 px-6 py-5'>
        <div className='flex min-w-0 items-center gap-5'>
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg [&>svg]:size-5 ${styles.icon}`}
          >
            {icon}
          </div>
          <div className='min-w-0'>
            <p className='text-muted-foreground truncate text-sm font-medium leading-snug'>
              {title}
            </p>
            {isLoading ? (
              <Skeleton className='mt-1.5 h-7 w-24 rounded-sm' />
            ) : (
              <p className='text-foreground truncate text-2xl font-bold leading-snug tracking-tight'>
                {displayValue}
              </p>
            )}
          </div>
        </div>
        {action}
      </CardContent>
    </Card>
  )
}
