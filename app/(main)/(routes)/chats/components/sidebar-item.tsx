"use client";

import Link from 'next/link';
import { toast } from 'sonner';

import { Ellipsis, Pencil, Share, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarItemProps {
  id: string;
  name: string;
}

export const SidebarItem = ({ id, name }: SidebarItemProps) => {


  // TODO: Add the ability to edit and delete chat session
  const handleEdit = () => {
    toast.error('Edit feature is not available yet')
  }

  const handleDelete = () => {
    toast.error('Delete feature is not available yet')
  }

  const handleShare = () => {
    toast.error('Share feature is not available yet')
  }


  return (
    <div
      className='relative flex group items-center gap-2 px-4 py-3  rounded-md text-sm hover:dark:bg-neutral-800 hover:bg-slate-100'
    >

      <Link
        href={`/chats/${id}`}
        className='w-full h-full rounded-md '
      >
        {name}

      </Link>
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
            onClick={handleEdit}
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

