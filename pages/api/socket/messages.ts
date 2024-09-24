import { NextApiResponseServerIo } from "@/typings/typing";
import { NextApiRequest } from "next";

import { db } from "@/lib/db";

import { currentProfilePage } from "@/lib/current-profile-pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {

    const user = await currentProfilePage(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log("USER", user)

    const { content } = req.body;


    const { sessionId } = req.query;

  
    if (!content || !sessionId) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // check session exists
    const session = await db.chatSession.findUnique({
      where: {
        id: sessionId as string,
        SessionUser: {
          some: {
            userId: user.id as string
          }
        }
      },
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }



    // create message - for user
    const userMessage = await db.message.create({
      data: {
        chatId: session.id,
        content: content,
        userId: user.id
      }
    })



    // TODO: get Response from the AI and create a message

    const io = res.socket.server.io;
    const sessionKey = `session:${sessionId}:session`

    io.emit(sessionKey, userMessage)

    console.log("EMITTED MESSAGE", userMessage)

    return res.status(200).json(userMessage);

  }
  catch (error) {
    console.log('[SOCKET MESSAGE ERROR] ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
