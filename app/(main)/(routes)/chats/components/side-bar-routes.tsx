import { redirect } from 'next/navigation';
import Link from 'next/link';

import { ChatSession } from '@prisma/client';
import { getSessionList } from '@/actions/chat-session/get-session-list';
import { auth } from '@clerk/nextjs/server'
import ListView from '@/components/global/list-view';
import { Button } from '@/components/ui/button';

export const SideBarRoutes = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect('/')
  }

  const data: ChatSession[] | null = await getSessionList();

  return (
    <div className='flex flex-col gap-4 p-4 relative h-full'>
      {
        !data ?
        <ListView
          items={data}
          render={(item, idx) => (
            <Button key={idx}
              className="rounded-xl truncate text-center w-full"
              variant={"secondary"}
              size={"lg"}
              asChild
            >
              <Link
                href={`/chats/${item.id}`}
                className='w-full'
              >

                {item.name}
              </Link>
            </Button>
          )}

        />
          : <p
            className="text-center absolute
            top-1/2 left-1/2 transform -translate-x-1/2 w-full -translate-y-1/2
            text-sm text-muted-foreground "
          >
            No chats session available
          </p>
      }
    </div>
  )
}

