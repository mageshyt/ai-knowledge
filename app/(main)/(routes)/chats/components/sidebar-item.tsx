"use client";

import Link from 'next/link';
import { toast } from 'sonner';

import { Archive, Ellipsis, Pencil, Share, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { updateSession } from '@/actions/chat-session/update-session';

interface SidebarItemProps {
  id: string;
  name: string;
}

export const SidebarItem = ({ id, name }: SidebarItemProps) => {
  //------------------State-------------------
  const [edit, setEdit] = useState<boolean>(false)
  const [editName, setEditName] = useState<string>(name)
  const [updating, setUpdating] = useState<boolean>(false)



  //------------------Handlers-------------------

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


  const handleShare = () => {
    toast.error('Share feature is not available yet')
  }

  const handleDelete = () => {
    toast.error('Delete feature is not available yet')
  }

  return (
    <div
      className='relative flex group items-center gap-2 px-4 py-3  rounded-md text-sm hover:dark:bg-neutral-800 hover:bg-slate-100'
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
            className='group-hover:opacity-100 opacity-0 focus:opacity-100 outline-none focus:outline-none'
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
            onClick={handleDelete}
          >
            <Archive className="size-4 mr-2" />
            Archive
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-500'
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

