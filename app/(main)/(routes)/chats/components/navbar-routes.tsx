import { SocketIndicatorBadge } from '@/components/global/socket-indicator-badge'
import { SettingsSidebar } from './settings-sidebar'

export const NavbarRoutes = () => {
  return (
    <div className='flex items-center gap-2'>
      <SocketIndicatorBadge />
      <SettingsSidebar/>
    </div>
  )
}
