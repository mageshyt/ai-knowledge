"use client"
import React, { ElementRef, Fragment, useRef } from 'react'
import tw from 'tailwind-styled-components';

import { Loader2, MessageSquare, ServerCrash } from 'lucide-react';

import { MessageWithUserProfile } from '@/typings/typing';
import { MessageContent } from './message-content';
import ListView from '@/components/global/list-view';
import { useChatScroll } from '@/hooks/use-chat-scroll';
import { useChatSocket } from '@/hooks/use-chat-socket';
import { useChatQuery } from '@/hooks/user-chat-query';

import { ScrollArea } from '@/components/ui/scroll-area';

interface MessagesProps {
  sessionId: string;
  apiUrl: string;
 paramKey: "sessionId";
  paramValue: string;
}

export const Messages = ({
  sessionId,
  apiUrl,
  paramValue,
  paramKey
}: MessagesProps) => {

  const queryKey = `session:${sessionId}`
  const addKey = `session:${sessionId}:session`;

  const chatRef = useRef<ElementRef<"div">>(null)
  const bottomRef = useRef<ElementRef<"div">>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  })

  useChatSocket({
    addKey,
    queryKey,
  })


  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    // get last page and its length
    count: data?.pages[0].messages.length || 0
  });



  if (status == 'pending') {
    return (
      <div
        className="flex flex-col flex-1 justify-center items-center h-full"
      >

        <Loader2 className="size-10 dark:text-zinc-500 text-zinc-400  animate-spin" />

        <div className="text-center">
          <h2 className="text-sm dark:text-white text-black font-semibold">
            Preparing your chat
          </h2>

          <p className="mt-2  text-xs dark:text-zinc-500 text-zinc-400">
            this might take up to a second
          </p>
        </div>
      </div>
    )
  }

  if (status == 'error') {
    return (
      <div
        className="flex flex-col flex-1 justify-center items-center h-full"
      >
        <ServerCrash className="h-7 w-7 text-zinc-500 dark:text-zinc-400 animate-plus" />
        <p
          className="text-xs text-zinc-500 dark:text-zinc-500"
        >
          Something went wrong
        </p>

      </div>
    )
  }

  return (
    <ScrollArea ref={chatRef}
      className='flex-1 flex flex-col h-full'
    >

      {/*  TOOD: Welcome Chat message and fetch older message */}

      <Wrapper >

        {

          data?.pages?.map((page, index) => (
            <Fragment key={index} >
              <ListView
                items={page.messages}
                render={(message: MessageWithUserProfile) => (
                  <MessageContent
                    content={message.content}
                    isUserMessage={message.role === "USER"}
                    name={message.user?.name || "YOU"}
                    key={message.id}
                  />
                )}
              />
            </Fragment>
          ))
        }

      </Wrapper>

      <div ref={bottomRef} />
    </ScrollArea >
  )
}



const Wrapper = tw.div`
flex-1 
h-full flex flex-col flex-col-reverse
py-4 gap-y-2 overflow-y-scroll
scrollbar-thin scrollbar-thumb-zinc-800 
    `
