"use client";
import { useChat } from "ai/react";
import { Mic, SendHorizonal } from "lucide-react";
import tw from "tailwind-styled-components";
import { Messages } from "./messages";

interface ChatWrapperProps {
  sessionId: string;
}

export const ChatWrapper = ({sessionId}:ChatWrapperProps) => {
  const {messages,handleInputChange,handleSubmit,input}=useChat({
    api:'/api/chat-stream',
    body:{sessionId}
  })
  return (
    <Wrapper>

      {/** Chat messages */}
      <MessaegWrapper>
        <Messages messages={messages} />
      </MessaegWrapper>


      {/** Chat input */}
    <SearchBar
      onSubmit={handleSubmit}
      >
      <Mic className='size-4 ml-1 text-muted-foreground' />
      <input
        value={input}
        onChange={handleInputChange}
        className='bg-transparent h-full outline-none w-full border-none p-2 '
        placeholder='Search for a chat'
      />
      <SendHorizonal
          type='button'
        onClick={handleSubmit}
          className='size-4 cursor-pointer mr-1 text-muted-foreground' />
    </SearchBar>


    </Wrapper>
  )
}


const Wrapper = tw.div`min-h-full flex flex-col justify-between gap-2 p-4`;
const MessaegWrapper = tw.div`
flex-1 overflow-y-auto h-full
flex flex-col justify-between`;

const SearchBar = tw.div`
w-full border bg-white/5  
flex items-center justify-between p-2 rounded-xl`
