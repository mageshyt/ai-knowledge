"use client";
import { Message, useChat } from "ai/react";
import tw from "tailwind-styled-components";
import { Messages } from "./messages";
import ChatInput from "./chat-input";
import Show from "@/components/global/show";

interface ChatWrapperProps {
  sessionId: string;
  initialMessages: Message[];
  hasPermission: boolean;
}

export const ChatWrapper = ({ sessionId, initialMessages, hasPermission }: ChatWrapperProps) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
    api: '/api/chat-stream',
    body: { sessionId },
    initialMessages,
  })
  return (
    <Wrapper>

      {/*--------------- Chat messages ------------- */}
      <MessaegWrapper>
        <Messages messages={messages} />
      </MessaegWrapper>

      {/*--------------- Chat Input------------- */}
      <Show>

        <Show.When
          isTrue={hasPermission}
        >
          <ChatInput
            apiUrl='/api/chat-stream'
            query={{ sessionId }}
            name='content'
            input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            setInput={setInput}
          />

        </Show.When>
      </Show>
    </Wrapper >
  )
}


const Wrapper = tw.div` flex-col flex h-full gap-2 p-4 overflow-hidden relative`;

const MessaegWrapper = tw.div`
h-full overflow-y-scroll
flex-1 flex flex-col justify-between`;
