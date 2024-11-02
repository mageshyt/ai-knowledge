import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import tw from 'tailwind-styled-components';

import { Preview } from '@/components/global/preview';
import Show from '@/components/global/show';
import { markdownToHtml } from '@/lib/format';

interface MessageContentProps {
  content:string;
  isUserMessage:boolean;
  name:string | undefined | null;

}
export const MessageContent = ({content,isUserMessage,name}:MessageContentProps) => {
  return (
    <Wrapper
      className={cn({
        "dark:bg-zinc-800 bg-zinc-50 rounded-md": !isUserMessage,
      }
      )}
    >
      <Container className='p-6'>

    <div className='max-w-3xl mx-auto flex items-start gap-2.5'>

      {/* Icon */}
      <IconIndicator
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
      </IconIndicator>

      {/* Badge */}
      <div
        className='flex flex-col ml-6 w-full'
      >
        <div className='flex items-center space-x-2'>
          <span
            className='text-sm font-semibold text-gray-900 dark:text-white'
          >
            {isUserMessage ? name  : 'Bot'}
          </span>
        </div>
        <Show>

              <Show.When isTrue={isUserMessage} >
        <UserMessaegPreview
          className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'
        >
          {content}
        </UserMessaegPreview>

              </Show.When>
              <Show.Else>
                <Preview value={markdownToHtml(content)} />
              </Show.Else>
            </Show>

      </div>

    </div>
    </Container>

    </Wrapper>
  )
}

const Wrapper = tw.div``;
const IconIndicator = tw.div``;
const Container = tw.div``;
const UserMessaegPreview = tw.div``;
