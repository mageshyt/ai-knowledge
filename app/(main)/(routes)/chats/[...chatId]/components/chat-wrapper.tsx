"use client";
import { useChat } from "ai/react";
import { Mic, SendHorizonal } from "lucide-react";
import tw from "tailwind-styled-components";
import { Messages } from "./messages";
import ChatInput from "./chat-input";

interface ChatWrapperProps {
  sessionId: string;
}

export const ChatWrapper = ({ sessionId }: ChatWrapperProps) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
    api: '/api/chat-stream',
    body: { sessionId }
  })
  return (
    <Wrapper>

      {/*--------------- Chat messages ------------- */}
      <MessaegWrapper>
        <Messages messages={messages} />
      </MessaegWrapper>

      {/*--------------- Chat Input------------- */}
      <ChatInput
        apiUrl='/api/chat-stream'
        query={{ sessionId }}
        name='content'
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        setInput={setInput}
      />

    </Wrapper >
  )
}


const Wrapper = tw.div` flex-col flex h-full gap-2 p-4 overflow-hidden relative`;

const MessaegWrapper = tw.div`
h-full overflow-y-scroll
flex-1 flex flex-col justify-between`;
