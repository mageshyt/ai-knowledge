import { db } from "@/lib";
import { currentProfile } from "@/lib/current-profile";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";


const MESSAGE_BATCH = 10

export async function GET(
  req: Request
) {
  try {
    const user = await currentProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get('cursor');
    const sessionId = searchParams.get('sessionId');

    // check if user exist or not
    if (!user) {
      return new NextResponse("Unauthroized", { status: 400 });
    }

    if (!sessionId) {

      return new NextResponse("Missing SessionID", { status: 400 });
    }

    let messages: Message[] = []

    console.log("CURSOR", cursor)
    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH,
        where: {
          chatId: sessionId,
        },
        skip: 1,
        cursor: {
          id: cursor,
        },
        include: {
          user: true
        },
        orderBy: {
          createdAt: "desc",
        }
      },

      )
    }
    else {
      messages = await db.message.findMany({
        where: {
          chatId: sessionId,
        },
        take: MESSAGE_BATCH,
        include: {
          user: true
        },
        orderBy: {
          createdAt: "desc", 
        }
      },
      )
    }

    let nextCursor = null;

    // if we have more messages to fetch
    if (messages.length === MESSAGE_BATCH) {
      nextCursor = messages[messages.length - 1].id
    }
    // once we have all the messages we dont have any next cursor so it will be null

    return NextResponse.json({
      messages: messages,
      nextCursor
    });
  }

  catch (err) {
    console.log('[MESSEGES GET]', err);
    return new NextResponse("Internal Error", { status: 500 })

  }
}
