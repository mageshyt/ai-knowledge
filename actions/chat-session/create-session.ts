"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

type ChatSessionProps = {
  contentUrl: string;

}
export const createSession = async ({ contentUrl }: ChatSessionProps) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return null
    }

    const chats = await db.chatSession.create({
      data: {
        userId,
        content: {
          create: {
            contentUrl: contentUrl
          }
        }
      }
    })

    console.log('[createSession] chats', chats)

    return chats;
  }
  catch (error) {
    console.error('[createSession] error', error)
    return null
  }
}
