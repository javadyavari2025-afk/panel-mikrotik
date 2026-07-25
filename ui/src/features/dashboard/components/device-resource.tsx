import { DeviceData } from '@/schema/dashboard.ts'
import { buildDeviceStats } from '@/utils/helper.ts'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  stats: DeviceData['DeviceInfo'] | undefined
}

export default function DeviceResource({ stats }: Props) {
  const items = buildDeviceStats(stats)

  return (
    <Card className='border-border/60 col-span-1 overflow-hidden lg:col-span-2'>
      <CardContent>
        <h2 className='text-foreground mb-2 flex items-center gap-2 text-lg font-semibold'>
          <span className='h-5 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500' />
          Hardware Statistics
        </h2>
        <div>
          {items.map(({ label, value }, idx) => (
            <div
              key={idx}
              className='border-border/60 hover:bg-accent/30 flex items-start justify-between rounded-lg border-b px-2 py-4 transition-colors last:border-b-0'
            >
              <span className='text-muted-foreground text-sm font-medium'>
                {label}
              </span>
              <div className='flex flex-col items-end text-sm'>
                <span
                  className={
                    value === 'N/A' ? 'text-muted-foreground' : 'text-foreground'
                  }
                >
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
