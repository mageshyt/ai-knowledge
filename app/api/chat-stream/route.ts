import { ragChat } from "@/lib";
import { NextRequest } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

export const POST = async (req: NextRequest) => {
  try {


    const { messages, sessionId } = await req.json()
    // Take the Last message Alone
    const lastMessage = messages[messages.length - 1]?.content;

    if (!lastMessage) {
      return new Response('No message found')
    }

    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId: sessionId
    })

    return aiUseChatAdapter(response)
  }
  catch (e) {
    console.log(e)
    return new Response('Error Occured')
  }

}
