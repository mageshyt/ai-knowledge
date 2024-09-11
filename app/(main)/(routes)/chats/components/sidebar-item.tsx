"use client";

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useKey } from "react-use";
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { Archive, Ellipsis, Pencil, Share, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';
import { updateSession } from '@/actions/chat-session/update-session';
import { useModal } from '@/hooks/use-modal';
import { deleteSession } from '@/actions/chat-session/delete-session';

interface SidebarItemProps {
  id: string;
  name: string;
}

export const SidebarItem = ({ id, name }: SidebarItemProps) => {

  //------------------Hooks-------------------
  const { openModal } = useModal()
  const router = useRouter()
  const pathname = usePathname()

  //------------------State-------------------
  const [edit, setEdit] = useState<boolean>(false)
  const [editName, setEditName] = useState<string>(name)
  const [updating, setUpdating] = useState<boolean>(false)

  const isActivity = pathname.includes(id)

  //------------------Handlers-------------------

  useKey('Escape', () => {
    setEdit(false)
  })

  // TODO: Add the ability to edit and delete chat session
  const handleEdit = async () => {

    try {
      setUpdating(true)

      const response = await updateSession({ sessionId: id, value: { name: editName } })

      if (response && "error" in response) {
        // Revert the name back to the original name
        toast.error(response.error)
        setEditName(name)
        return;
      }

      if (response) {
        toast.success('Session updated successfully')
        setEdit(false)

      }
    }
    catch (error) {
      console.error(error)
      // Revert the name back to the original name
      setEditName(name)
      toast.error('Failed to update sessionId')
    }
    finally {
      setUpdating(false)
    }
  }


  const handleShare = async () => {
    toast.error('Share feature is not available yet')
  }


  const handleDelete = async () => {
    try {
      setUpdating(true)
      const response = await deleteSession({ sessionId: id })

      if (response && "error" in response) {
        toast.error(response.error)
        return;
      }

      toast.success('Session deleted successfully');

      // Redirect to the chats page
      router.push('/chats')
    }
    catch (error) {
      console.error(error)
      toast.error('Failed to delete sessionId')
    }
    finally {
      setUpdating(false)

    }
  }

  const handleArchive = async () => {
    try {
      setUpdating(true)
      // Call the archive session API
      const response = await updateSession({ sessionId: id, value: { archived: true } })
      if (response && "error" in response) {
        toast.error(response.error)
        return;
      }
      // If successful, show success toast
      toast.success('Session archived successfully')
      // Redirect to the chats page
      router.push('/chats')
    }
    catch (error) {
      console.error(error)
      toast.error('Failed to archive');
    }
    finally {
      setUpdating(false)
    }
  }


  return (
    <div
      className={cn('relative flex group items-center gap-2 px-4 py-3  rounded-md text-sm hover:dark:bg-neutral-800 hover:bg-slate-100',
        isActivity ? 'bg-slate-100 dark:bg-neutral-800' : 'dark:hover:bg-neutral-800'
      )}
    >

      {
        edit ? (
          <Input
            onChange={(e) => setEditName(e.target.value)}
            disabled={updating}
            onKeyPress={(e) => {
              console.log(e.key) // Handle Enter and Escape key
              if (e.key === 'Enter')
                handleEdit()
            }
            }

            type='text'
            className='w-full h-full rounded-md'
            value={editName}
          />
        )
          :

          <Link
            href={`/chats/${id}`}
            className='w-full h-full rounded-md '
          >
            {editName}

          </Link>
      }
      {/* Button to edit  */}
      <DropdownMenu
      >
        <DropdownMenuTrigger
          asChild
        >
          <button
            className={cn('group-hover:opacity-100 opacity-0 focus:opacity-100 outline-none focus:outline-none',
              edit || isActivity ? 'opacity-100' : 'opacity-0',

            )}
          >

            <Ellipsis className="size-4 ml-2 " />
          </button>
        </DropdownMenuTrigger>
        {/* ----------------Button to Edit and Share-------------- */}
        <DropdownMenuContent
          className='w-40'
        >
          <DropdownMenuItem
            onClick={() => setEdit(!edit)}
          >
            <Pencil className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleShare}
          >
            <Share className="size-4 mr-2" />
            Share
          </DropdownMenuItem
          >

          <DropdownMenuSeparator />

          {/* ----------------Button to delete-------------- */}

          <DropdownMenuItem
            onClick={() => openModal('confirm-modal', { sessionId: id, sessionName: editName, handleConfirm: handleArchive, actionType: 'archive' })}
          >
            <Archive className="size-4 mr-2" />
            Archive
          </DropdownMenuItem>

          <DropdownMenuItem

            className='text-red-500'
            onClick={() => openModal('confirm-modal', { sessionId: id, sessionName: editName, handleConfirm: handleDelete, actionType: 'delete' })}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

