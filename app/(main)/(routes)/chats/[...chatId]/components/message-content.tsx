import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import React from 'react'

interface MessageContentProps {
  content:string;
  isUserMessage:boolean;

}
export const MessageContent = ({content,isUserMessage}:MessageContentProps) => {
  return (
    <div
      className={cn({
        "bg-zinc-800 rounded-md": isUserMessage,
      }
      )}
    >
      <div className='p-6'>

    <div className='max-w-3xl mx-auto flex items-start gap-2.5'>

      {/* Icon */}
      <div
        className={cn(
          "size-10 shrink-0 aspect-square rounded-full border border-zinc-800 bg-zinc-900             flex justify-center items-center",
          {
            "bg-purple-950 border-purple-700 text-zinc-200" : isUserMessage,
          }
  )
        }

      >
      
        {
          isUserMessage ?
          <User className='size-5'/> :
            <Bot className='size-5 text-white'/>
        }
      </div>

      {/* Badge */}
      <div
        className='flex flex-col ml-6 w-full'
      >
        <div className='flex items-center space-x-2'>
          <span
            className='text-sm font-semibold text-gray-900 dark:text-white'
          >
            {isUserMessage ? 'You' : 'Bot'}
          </span>
        </div>

        <p
          className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'
        >
          {content}
        </p>

      </div>

    </div>
    </div>

    </div>
  )
}

