import { IconHeartFilled, IconRoute } from '@tabler/icons-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { sidebarData } from './data/sidebar-data'
import React from 'react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      {open && (
        <SidebarHeader className='flex-row items-center justify-center gap-2 pt-5'>
          <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30'>
            <IconRoute className='h-5 w-5' />
          </span>
          <h1 className='bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent'>
            MWPanel
          </h1>
        </SidebarHeader>
      )}

      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>

      {open && (
        <SidebarFooter className='flex items-center justify-center gap-1 border-t border-sidebar-border/60 p-4 text-white/80'>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className='flex items-center justify-center gap-1 text-xs font-normal'>
                <span>Made with</span>
                <IconHeartFilled size='13' className='text-fuchsia-400' />
                <span>by</span>
                <a
                  href='https://github.com/Maahdima'
                  className='text-xs font-medium text-violet-300 hover:text-violet-200'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Maahdima
                </a>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div className='w-full text-center text-xs text-white/50'>
                v{__APP_VERSION__}
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  )
}
