"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { ChatSession } from "@prisma/client";


type getSessionUserProps = {
  sessionId: string
}


export const getSessionUser = async ({ sessionId }: getSessionUserProps) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return []
    }

    const sessionUser = await db.sessionUser.findMany({
      where: {
        sessionId
      },
      include: {
        user: true
      }
    })

    return sessionUser;
  }
  catch (error) {
    console.error("[getSessionUser]", error)
    return []
  }
}
