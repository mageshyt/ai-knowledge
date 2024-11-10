"use server";
import { db } from "@/lib";
import { sidebarRateLimit } from "@/lib/rate-limiter";
import { auth } from "@clerk/nextjs/server";
import { ChatSession } from "@prisma/client";


type UserSessions = {
  chats: ChatSession[],
  sharedSession: ChatSession[]
  error?: "RATE_LIMITED" | "UNAUTHORIZED" | "INTERNAL_SERVER_ERROR"
}

export const getSessionList = async (): Promise<UserSessions> => {
  try {
    const isRatelimited=await sidebarRateLimit()

    if (isRatelimited?.error){
      return {
        error: "RATE_LIMITED",
        chats: [],
        sharedSession: []
      }
    }
    const { userId } = auth()

    if (!userId) {
      return {
        error: "UNAUTHORIZED",
        chats: [],
        sharedSession: []
      }
    }

    const chats = await db.chatSession.findMany({
      where: {
        userId,
        archived: false
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    const sharedSession = await db.chatSession.findMany({
      where: {
        archived: false,
        SessionUser: {
          some: {
            userId
          }
        }
      }
    })

    // shard session may contain the same session as the user's session so filter it
    const filteredSharedSession = sharedSession.filter(session => session.userId !== userId);


    return {
      chats,
      sharedSession: filteredSharedSession
    }

  }
  catch (error) {
    console.error(error)
    return {
      chats: [],
      sharedSession: [],
      error: "INTERNAL_SERVER_ERROR"
    }
  }
}
