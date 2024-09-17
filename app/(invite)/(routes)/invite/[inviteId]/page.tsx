import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";



interface InvitePageProps {
  params: {
    inviteId: string
  }
}

const InvitePage = async ({
  params: {
    inviteId
  }
}: InvitePageProps) => {
  const { userId } = auth();

  if (!userId || !inviteId) {
    return redirect('/');
  }

  const session = await db.chatSession.findUnique({
    where: {
      inviteCode: inviteId,

    },
    include: {
      sharedSession: true
    }
  })

  if (!session) {
    return redirect('/');
  }
  // ! owner can't join his own chatSession
  if (session.userId === userId) {
    return redirect(`/chats/${session.id}`);
  }

  const isExisting = await db.sessionUser.findFirst({
    where: {
      sessionId: session.sharedSession?.id,
      userId
    }
  })

  if (isExisting) {
    return redirect(`/chats/${session.id}`);
  }

  const sessionUser = await db.sharedSession.upsert(
    {
      where: {
        chatSessionId: session.id
      },
      create: {
        chatSessionId: session.id,
        sessionUser: {
          create: {
            userId
          }
        }
      },
      update: {
        sessionUser: {
          create: {
            userId
          }
        }
      }
    }
  )

  if (sessionUser) {
    return redirect(`/chats/${session.id}`);
  }

  return null;
}

export default InvitePage;
