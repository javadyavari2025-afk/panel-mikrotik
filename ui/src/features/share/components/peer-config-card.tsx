'use client'

import { useEffect, useState } from 'react'
import { CopyIcon, DownloadIcon, FileTextIcon, EyeIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ConfigCardProps {
  isLoading: boolean
  blob?: Blob
  peerName?: string
}

export default function PeerConfigCard({
  isLoading,
  blob,
  peerName,
}: ConfigCardProps) {
  const [configText, setConfigText] = useState<string>('')
  const [isBlurred, setIsBlurred] = useState(true)

  useEffect(() => {
    if (blob) {
      const reader = new FileReader()
      reader.onload = () => setConfigText(reader.result as string)
      reader.readAsText(blob)
    }
  }, [blob])

  const handleCopy = async () => {
    if (!configText) return
    await navigator.clipboard.writeText(configText)
    toast.success('Copied to clipboard.', { duration: 5000 })
  }

  const handleDownload = () => {
    if (!configText) return
    const file = new Blob([configText], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = `${peerName || 'peer'}.conf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev)
  }

  return (
    <Card className='relative gap-3 overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20'>
      <div className='pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl' />

      <CardHeader className='relative'>
        <CardTitle className='flex items-center gap-2'>
          <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'>
            <FileTextIcon className='h-4 w-4' />
          </span>
          <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-300 dark:to-teal-300'>
            Configuration
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='relative'>
        {isLoading ? (
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-4/6' />
            <Skeleton className='h-4 w-3/6' />
            <Skeleton className='mt-4 h-10 w-32' />
          </div>
        ) : (
          <>
            <div
              className='relative max-h-[60vh] min-h-[10vh] cursor-pointer overflow-auto rounded-xl border border-emerald-500/20 bg-black/90 px-4 py-3 shadow-inner'
              onClick={toggleBlur}
              title={isBlurred ? 'Click to reveal' : 'Click to hide'}
            >
              <pre
                className={`font-mono text-sm break-words whitespace-pre-wrap text-emerald-300 transition-all duration-300 ${
                  isBlurred ? 'blur-md' : 'blur-0'
                }`}
              >
                <code>{configText}</code>
              </pre>

              {isBlurred && (
                <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/60 font-semibold text-white backdrop-blur-[2px]'>
                  <EyeIcon className='h-6 w-6' />
                  <span>Click to reveal</span>
                </div>
              )}

              <Button
                size='sm'
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy()
                }}
                className='absolute top-2 right-2 border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-600'
              >
                <CopyIcon className='mr-1 h-4 w-4' />
                Copy
              </Button>
            </div>

            <Button
              className='mt-4 border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-600'
              onClick={handleDownload}
            >
              <DownloadIcon className='mr-1 h-4 w-4' />
              Download Config
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
