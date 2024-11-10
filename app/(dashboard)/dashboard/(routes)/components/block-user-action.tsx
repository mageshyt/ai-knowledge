"use client";
import { blockUser } from '@/actions/dashboard/block-user';
import { Switch } from '@/components/ui/switch';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface BlockUserActionProps {
  user: User
}
const BlockUserAction = ({ user }: BlockUserActionProps) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isBlocked, setIsBlocked] = useState(user.isBlocked)

  const handleBlockUser = async () => {
    try {
      setLoading(true)
      const res = await blockUser(user.id)

      console.log(res)

      if (res.error) {
        return toast.error(res.error)
      }

      toast.success("User blocked successfully")

      setIsBlocked(!isBlocked)
      router.refresh()
    }
    catch (error) {
      console.log(error)
      toast.error("Failed to block user")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <Switch
      disabled={loading}
      checked={isBlocked}
      onCheckedChange={handleBlockUser}
      className={"disabled:cursor-not-allowed"}
    />
  )
}

export default BlockUserAction
