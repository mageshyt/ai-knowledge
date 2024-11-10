import { db } from "@/lib/db";
import { sidebarRateLimit } from "@/lib/rate-limiter";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  try {
    const isRatelimited = await sidebarRateLimit()

    if (isRatelimited?.error) {
      return new NextResponse("Rate limited", { status: 429 })
    }
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
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

    return NextResponse.json({
      chats,
      sharedSession: filteredSharedSession
    })

  }
  catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }

}
