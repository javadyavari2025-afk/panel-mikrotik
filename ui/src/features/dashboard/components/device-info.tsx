import { DeviceData } from '@/schema/dashboard.ts'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  stats: DeviceData | undefined
}

export default function DeviceInfo({ stats }: Props) {
  const items = [
    { label: 'Identity', value: stats?.DeviceIdentity.identity },
    {
      label: 'Device',
      value: stats?.DeviceInfo.board_name,
      badge: stats?.DeviceInfo.cpu_arch,
      badgeStyle: 'bg-gradient-to-r from-violet-500 to-purple-500',
    },
    {
      label: 'OS Version',
      value: stats?.DeviceInfo.os_version,
      badge: 'stable', //  make dynamic if needed
      badgeStyle: 'bg-gradient-to-r from-amber-500 to-orange-500',
    },
    {
      label: 'Public IPv4',
      value: stats?.DeviceIPv4Address?.ipv4,
      badge: stats?.DeviceIPv4Address?.isp,
      badgeStyle: 'bg-gradient-to-r from-cyan-500 to-sky-500',
    },
    { label: 'DNS Servers', value: stats?.DNSConfig?.dns_servers },
  ]

  return (
    <Card className='border-border/60 col-span-1 overflow-hidden lg:col-span-3'>
      <CardContent>
        <h2 className='text-foreground mb-2 flex items-center gap-2 text-lg font-semibold'>
          <span className='h-5 w-1 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500' />
          Mikrotik Statistics
        </h2>
        <div>
          {items.map(({ label, value, badge, badgeStyle }, idx) => (
            <div
              key={idx}
              className='border-border/60 hover:bg-accent/30 flex items-start justify-between rounded-lg border-b px-2 py-4 transition-colors last:border-b-0'
            >
              <span className='text-muted-foreground text-sm font-medium'>
                {label}
              </span>
              <div className='text-foreground flex flex-col items-end text-sm'>
                <span className={!value ? 'text-muted-foreground' : ''}>
                  {value ?? 'N/A'}
                </span>
                {badge && (
                  <span
                    className={`mt-1 rounded-md px-2 py-0.5 text-xs text-white shadow-sm ${
                      badgeStyle || 'bg-gradient-to-r from-violet-500 to-purple-500'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
