import { SocketIndicatorBadge } from '@/components/global/socket-indicator-badge'
import { ManageSession } from './manage-session'

export const NavbarRoutes = () => {
  return (
    <div className='flex items-center gap-2'>
      <SocketIndicatorBadge />
      <ManageSession />
    </div>
  )
}
