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

    const { content, role } = req.body;


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



    const io = res.socket.server.io;
    const sessionKey = `session:${sessionId}:session`

    // create message - for user
    if (role === "user") {
      const userMessage = await db.message.create({
        data: {
          chatId: session.id,
          content: content,
          userId: user.id
        }
      })
      io.emit(sessionKey, userMessage);
      return res.status(200).json(userMessage);
    }
    else if (role === "bot") {
      const botMessage = await db.message.create({
        data: {
          chatId: session.id,
          content: content,
          role: "BOT"
        }
      })
      io.emit(sessionKey, botMessage);
      return res.status(200).json(botMessage);

    }




  }
  catch (error) {
    console.log('[SOCKET MESSAGE ERROR] ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
