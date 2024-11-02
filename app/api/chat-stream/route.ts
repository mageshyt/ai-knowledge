import { ragChat } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {


    const { content, sessionId } = await req.json()

    if (!content) {
      return new Response('No message found')
    }

    const response = await ragChat.chat(content, {
      streaming: false,
      sessionId: sessionId
    })

    
    return NextResponse.json(response.output)

  }
  catch (e) {
    console.log(e)
    return new Response('Error Occured')
  }

}
