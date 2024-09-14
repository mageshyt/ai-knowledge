import React from 'react'
import { Message as TMessage } from 'ai/react';
import ListView from '@/components/global/list-view';
import { MessageContent } from './message-content';
import { MessageSquare } from 'lucide-react';

interface MessagesProps {
  messages: TMessage[];
}
export const Messages = ({ messages }: MessagesProps) => {
  return (
    <div
      className='flex-1 overflow-y-auto flex flex-col'
    >
      {
        messages.length > 0 ? <ListView
          items={messages}
          render={(message: TMessage) => <MessageContent
            content={message.content}
            isUserMessage={message.role === 'user'}
          />}
        /> :
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <MessageSquare className="size-10 text-blue-500" />
            <h3 className="font-semibold text-xl dark:text-white">Ready to roll!</h3>
            <p className="text-zinc-500 text-sm">Go ahead, ask your first question and explore.</p>
          </div>
      }

    </div>
  )
}

