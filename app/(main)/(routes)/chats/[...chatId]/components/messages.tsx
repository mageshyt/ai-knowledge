import React from 'react'
import ListView from '@/components/global/list-view';
import { MessageContent } from './message-content';
import { MessageSquare } from 'lucide-react';
import tw from 'tailwind-styled-components';
import { MessageWithUserProfile } from '@/typings/typing';

interface MessagesProps {
  messages: MessageWithUserProfile[];
}
export const Messages = ({ messages }: MessagesProps) => {
  console.log(messages)
  return (
    <Wrapper >
      {
        messages.length > 0 ? <ListView
          items={messages}
          render={(message: MessageWithUserProfile) => <MessageContent
            content={message.content}
            isUserMessage={message.role === 'user'}
          />}
        /> :
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <MessageSquare className="size-10 text-blue-500" />
            <h3 className="font-semibold text-xl dark:text-white">Ready to roll!</h3>
            <p className="text-zinc-500 text-sm">
              Go ahead, ask your first question and explore.
            </p>
          </div>
      }

    </Wrapper>
  )
}
const Wrapper = tw.div`
flex-1 flex flex-col
py-4 gap-y-2 overflow-y-scroll
scrollbar-thin scrollbar-thumb-zinc-800 
    `
