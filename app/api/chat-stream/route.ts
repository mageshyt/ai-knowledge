import { ragChat } from "@/lib";
import { NextRequest } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

export const POST=async (req:NextRequest)=>{
  const {messages,sessionId}=await req.json()
  // Take the Last message Alone
  const lastMessage=messages[messages.length-1]?.content;

  if(!lastMessage){
    return new Response('No message found')
  }

  const response=await ragChat.chat(lastMessage,{
    streaming:true,
    sessionId:sessionId
  })

  console.log('response',response)


  return  aiUseChatAdapter(response)


}
