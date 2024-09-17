"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuid } from 'uuid';

type ChatSessionProps = {
  contentUrl: string;
  name: string;

}
export const createSession = async ({ contentUrl,name }:ChatSessionProps ) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return null
    }


    const chats = await db.chatSession.create({
      data: {
        userId,
        name:name,
        inviteCode:uuid(),
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
