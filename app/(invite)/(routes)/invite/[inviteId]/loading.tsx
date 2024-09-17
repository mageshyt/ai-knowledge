import { LoaderCircle, UserPlus } from 'lucide-react';
import React from 'react'

const InviteLoading = () => {
  return (
    <div className="p-6 h-screen w-full flex flex-col items-center justify-center
       space-y-4">

      <UserPlus
        className='size-20 animate-bounce'
      />


      <div 

        className='flex items-center justify-center gap-4 flex-col'
        >

        <h2 className="text-xl dark:text-white text-black font-semibold">
          Accepting Invite
        </h2>

        <p className="mt-2  text-sm text-zinc-500">
          please wait , this might take up to a second
        </p>
      </div>

    </div>
  )
}

export default InviteLoading;
