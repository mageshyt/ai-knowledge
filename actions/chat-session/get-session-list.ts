"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

export const getSessionList = async () => {
  try {
    const { userId } = auth()

    if (!userId) {
      return null
    }

    const chats = await db.chatSession.findMany({
      where: {
        userId,
        archived: false
      },
    })


    return chats;
  }
  catch (error) {
    console.error(error)
    return null
  }
}
