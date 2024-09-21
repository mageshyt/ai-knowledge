
"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { ChatSession } from "@prisma/client";


type UserSessions = {
  chats: ChatSession[],
}

export const getAchivedChatSession= async (): Promise<UserSessions> => {
  try {
    const { userId } = auth()

    if (!userId) {
      return {
        chats: [],
      }
    }

    const chats = await db.chatSession.findMany({
      where: {
        userId,
        archived: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return {
      chats,
    }

  }
  catch (error) {
    console.error(error)
    return {
      chats: [],
    }
  }
}
