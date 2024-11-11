import { SocketIndicatorBadge } from '@/components/global/socket-indicator-badge'
import { ManageSession } from './manage-session'
import { BanIndicatorBadge } from '@/components/global/ban-indicator-badge'

export const NavbarRoutes = () => {
  return (
    <div className='flex items-center gap-2'>
      <BanIndicatorBadge />
      <SocketIndicatorBadge />
      <ManageSession />
    </div>
  )
}
