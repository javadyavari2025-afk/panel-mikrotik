import { IconUserOff } from '@tabler/icons-react'
import { DeviceData } from '@/schema/dashboard.ts'
import { getAvatarInitials } from '@/utils/helper.ts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  peers: DeviceData['PeerInfo']['recent_online_peers']
}

const avatarGradients = [
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-sky-500',
  'from-rose-500 to-pink-500',
]

export default function RecentlyOnlineUsers({ peers }: Props) {
  const hasPeers = peers && peers.length > 0

  return (
    <Card className='border-border/60 col-span-1 flex h-full flex-col overflow-hidden lg:col-span-2'>
      <CardHeader>
        <CardTitle className='text-foreground mb-4 flex items-center gap-2 text-lg font-semibold'>
          <span className='h-5 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-sky-500' />
          Recently Online Users
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col p-0'>
        {!hasPeers ? (
          <div className='text-muted-foreground flex flex-grow flex-col items-center justify-center gap-4'>
            <IconUserOff size={64} stroke={1.5} />
            <p className='text-center text-base'>
              No users have been online recently.
            </p>
          </div>
        ) : (
          <div className='-mt-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='pl-6'>User</TableHead>
                  <TableHead className='pr-6 text-right'>Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {peers.map((peer, idx) => (
                  <TableRow key={idx} className='hover:bg-accent/30'>
                    <TableCell className='py-4 pl-6 font-medium'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-md ${
                            avatarGradients[idx % avatarGradients.length]
                          }`}
                        >
                          {getAvatarInitials(peer.name)}
                        </div>
                        <span>{peer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className='text-muted-foreground pr-6 text-right'>
                      {peer.last_seen} ago
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
