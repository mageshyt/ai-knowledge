"use client";
import { Message } from "ai/react";
import tw from "tailwind-styled-components";
import { Messages } from "./messages";
import ChatInput from "./chat-input"; 
import Show from "@/components/global/show";
import { useChatQuery } from "@/hooks/user-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWrapperProps {
  sessionId: string;
  initialMessages: Message[];
  hasPermission: boolean;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "sessionId";
  paramValue: string;
}

export const ChatWrapper = ({
  sessionId,
  initialMessages,
  hasPermission,
  apiUrl,
  socketUrl,
  socketQuery,
  paramValue,
  paramKey
}: ChatWrapperProps) => {

  const queryKey = `session:${sessionId}`
  const addKey= `session:${sessionId}:session`;

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




  if (status == 'pending') {
    return (
      <div
        className="flex flex-col flex-1 justify-center items-center h-full"
      >
        <Loader2 className="h-7 w-7 text-zinc-500 dark:text-zinc-400 animate-spin"/>
        <p
          className="text-xs text-zinc-500 dark:text-zinc-500"
        >
          Loading message ...
        </p>

      </div>
    )
  }

  if (status == 'error') {
    return (
      <div
        className="flex flex-col flex-1 justify-center items-center h-full"
      >
        <ServerCrash className="h-7 w-7 text-zinc-500 dark:text-zinc-400 animate-plus"/>
        <p
          className="text-xs text-zinc-500 dark:text-zinc-500"
        >
          Something went wrong
        </p>

      </div>
    )
  }

  console.log(data)

  return (
    <Wrapper>

      {/*--------------- Chat messages ------------- */}
      <MessaegWrapper hidden={true} >
        {/* <Messages messages={messages} /> */}
        {
          data?.pages?.map((page, index) => (
            <Fragment key={index}>
              <Messages messages={page.messages} />
            </Fragment>
          ))
        }
      </MessaegWrapper>

      {/*--------------- Chat Input------------- */}
      <Show>

        <Show.When
          isTrue={hasPermission}
        >
          <ChatInput
            apiUrl="/api/socket/messages"
            query={{ sessionId }}
            name='content'
            sessionId={sessionId}
          />

        </Show.When>
      </Show>
    </Wrapper >
  )
}


const Wrapper = tw.div` flex-col flex h-full gap-2 p-4 overflow-hidden relative`;

const MessaegWrapper = tw(ScrollArea)`
h-full  
flex-1 flex flex-col justify-between`;
