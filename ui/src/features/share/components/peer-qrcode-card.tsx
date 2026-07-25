'use client'

import { useState } from 'react'
import { QrCodeIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface QRCodeCardProps {
  isLoading: boolean
  qrCode?: string
}

export default function PeerQRCodeCard({ isLoading, qrCode }: QRCodeCardProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  const handleToggleBlur = () => {
    setIsBlurred((prev) => !prev)
  }

  return (
    <Card className='relative flex h-full flex-col overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/20'>
      {/* decorative glow */}
      <div className='pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl' />

      <CardHeader className='relative'>
        <CardTitle className='flex items-center gap-2'>
          <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'>
            <QrCodeIcon className='h-4 w-4' />
          </span>
          <span className='bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-violet-300 dark:to-fuchsia-300'>
            QR Code
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='relative flex flex-1 items-center justify-center'>
        {isLoading ? (
          <Skeleton className='h-[300px] w-[300px] rounded-2xl' />
        ) : (
          <div
            onClick={handleToggleBlur}
            className='group relative cursor-pointer rounded-2xl p-3 transition-transform duration-300 hover:scale-[1.02]'
            title={isBlurred ? 'Click to reveal' : 'Click to hide'}
          >
            {/* gradient frame */}
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 opacity-80' />
            <div className='relative rounded-xl bg-white p-3'>
              <img
                src={qrCode}
                alt='QR Code'
                width={300}
                height={300}
                className={`rounded-lg transition-all duration-300 ${
                  isBlurred ? 'blur-md' : 'blur-0'
                }`}
              />
            </div>

            {isBlurred ? (
              <div className='absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/50 font-semibold text-white backdrop-blur-[2px]'>
                <EyeIcon className='h-6 w-6' />
                <span>Click to reveal</span>
              </div>
            ) : (
              <div className='absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                <EyeOffIcon className='h-4 w-4' />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
