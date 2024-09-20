import { redirect } from 'next/navigation';
import tw from 'tailwind-styled-components';

import { getSessionList } from '@/actions/sidebar/get-session-list';
import { auth } from '@clerk/nextjs/server'

import ListView from '@/components/global/list-view';
import ActionTooltip from '@/components/global/action-tooltip';
import { SidebarItem } from './sidebar-item';

export const SideBarRoutes = async () => {

  const { userId } = auth();

  if (!userId) {
    redirect('/')
  }

  const data = await getSessionList();

  const { chats, sharedSession } = data;

  return (
    <Wrapper>

      {
        chats && chats.length > 0 &&
        <SessionWrapper>
          <ListView
            items={data.chats}
            render={(item) => (
              <SidebarItem
                key={item.id}
                {...item}
                inviteCode={item.inviteCode}
              />
            )
            }
          />

        </SessionWrapper>
      }


      {/* ----------------------- Shared session--------------------- */}

      {
        sharedSession && sharedSession.length > 0 &&
        <SessionWrapper>
          <p className="py-1 text-muted-foreground 
                text-center  text-sm font-semibold">
            Shared Sessions
          </p>

          <ListView
            items={data.sharedSession}
            render={(item) => (
              <SidebarItem
                key={item.id}
                {...item}
                inviteCode={item.inviteCode}
                isShared={true}
              />
            )
            }
          />

        </SessionWrapper>
      }


      {/* ----------------------- No session available--------------------- */}

      {
        chats.length === 0 && sharedSession.length === 0 &&
        <ActionTooltip label="Create a new chat session" side="bottom" align="center">
          <NoSession>
            No chats session available
          </NoSession>
        </ActionTooltip>
      }
    </Wrapper>
  )
}

const Wrapper = tw.div`flex flex-col gap-4  relative h-full`

const SessionWrapper = tw.div`p-4`

const NoSession = tw.p`
text-center absolute cursor-pointer
top-1/2 left-1/2 transform -translate-x-1/2 w-full -translate-y-1/2
text-sm text-muted-foreground 
`
