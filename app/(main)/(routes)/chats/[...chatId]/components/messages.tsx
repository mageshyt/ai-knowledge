import React from 'react'
import {Message as TMessage} from 'ai/react';
import ListView from '@/components/global/list-view';
import { MessageContent } from './message-content';

interface MessagesProps {
  messages:TMessage[];
}
export const Messages = ({messages}:MessagesProps) => {
  return (
    <div
      className='flex-1 overflow-y-auto flex flex-col'
    >
      {
        messages ? <ListView
          items={messages}
          render={(message:TMessage)=><MessageContent
            content={message.content}
            isUserMessage={message.role==='user'}
          /> }
        /> : <div>No messages</div>
      }

    </div>
  )
}

