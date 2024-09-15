import { Button } from '@/components/ui/button'
import { SocketIndicatorBadge } from '@/components/global/socket-indicator-badge'
import { ShareModal } from '@/components/modals/share-modal'
import { SettingsSidebar } from './settings-sidebar'

export const NavbarRoutes = () => {
  return (
    <div className='flex items-center gap-2'>

      <SocketIndicatorBadge /> 
      <ShareModal />
      <SettingsSidebar/>

    </div>
  )
}
