"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuid } from 'uuid';

type ChatSessionProps = {
  contentUrl: string;
  name: string;

}
export const createSession = async ({ contentUrl, name }: ChatSessionProps) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return {
        error : 'User not found',
        chat:null
      }
    }
    const user = await db.user.findFirst({
      where: {
        id: userId
      }
    })

    if (user?.isBlocked){
      return {
        error : 'You are blocked, please contact support',
        chat:null
      }
    }

    const chats = await db.chatSession.create({
      data: {
        userId,
        name: name,
        inviteCode: uuid(),
        content: {
          create: {
            contentUrl: contentUrl
          }
        },
        SessionUser: {
          create: {
            userId: userId,
            access: 'ADMIN',
          }
        }
      }
    })

    console.log('[createSession] chats', chats)

    return {
      error: null,
      chat: chats
    }
  }
  catch (error) {
    console.error('[createSession] error', error)
    return {
      error: 'Error while creating conversation',
      chat:null
    }
  }
}
