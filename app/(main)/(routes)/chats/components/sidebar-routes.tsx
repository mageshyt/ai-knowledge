import { redirect } from 'next/navigation';

import { ChatSession } from '@prisma/client';
import { getSessionList } from '@/actions/chat-session/get-session-list';
import { auth } from '@clerk/nextjs/server'

import ListView from '@/components/global/list-view';
import ActionTooltip from '@/components/global/action-tooltip';
import { SidebarItem } from './sidebar-item';

export const SideBarRoutes = async () => {

  const { userId } = auth();

  if (!userId) {
    redirect('/')
  }

  const data: ChatSession[] | null = await getSessionList();

  return (
    <div className='flex flex-col gap-4 p-4 relative h-full'>
      {
        data ?
          <ListView
            items={data}
            render={(item, idx) => (
              <SidebarItem
                key={item.id}
                {...item} />
            )
            }
          />
          :
          <ActionTooltip label="Create a new chat session" side="bottom" align="center">
            <p
              className="text-center absolute cursor-pointer
            top-1/2 left-1/2 transform -translate-x-1/2 w-full -translate-y-1/2
            text-sm text-muted-foreground "
            >
              No chats session available
            </p>
          </ActionTooltip>
      }
    </div>
  )
}

