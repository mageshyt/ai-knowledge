"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

type ChatSessionProps = {
  sessionId: string;
  value: Record<string, unknown>;
}
export const updateSession = async ({ sessionId, value }: ChatSessionProps) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return {
        error: "You are not authenticated"
      }
    }

    // check if the use is the owner of the session
    const session = await db.chatSession.findFirst({
      where: {
        userId,
        id: sessionId
      }
    })

    if (!session) {
      return {
        error: "You are not the owner of the session"
      }
    }

    const updatedSession = await db.chatSession.update({
      where: {
        id: sessionId,
        userId: userId
      },
      data: {
        updatedAt: new Date(),
        ...value
      }
    })

    console.log('[createSession] updatedSession', updatedSession)
    return updatedSession;
  }
  catch (error) {
    console.error('[createSession] error', error)
    return null
  }
}
