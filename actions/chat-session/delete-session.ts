
"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

type ChatSessionProps = {
  sessionId: string;
}
export const deleteSession= async ({ sessionId }: ChatSessionProps) => {
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

    await db.chatSession.delete({
      where: {
        id: sessionId,
        userId: userId
      }
    });



    return {
      message: 'Session deleted successfully'
    }

  }
  catch (error) {
    console.error('[createSession] error', error)
    return {
      error: 'Failed to delete sessionId'
    }
  } 
}
