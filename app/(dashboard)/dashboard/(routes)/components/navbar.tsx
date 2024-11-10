"use client";

import { useMediaQuery } from "@uidotdev/usehooks";

import {UserProfile} from './user-profile'
import { Logo } from '@/components/global/Logo'

const Navbar = () => {

  const isMobile = useMediaQuery('(max-width: 768px)')
   
  return (
    <div className="flex justify-between items-center p-4 border-b h-full mx-4">
      <Logo
        size='lg'
        type={isMobile ? 'minimal' : 'full'}
      />
      <UserProfile/>
    </div>
  )
}

export default Navbar
