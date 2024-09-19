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
  })

  if (!session) {
    return redirect('/');
  }

  const isExistingUser = await db.sessionUser.findUnique({
    where:{
      userId_sessionId:{
        sessionId: session.id,
        userId
      }
    }
  });

  if(isExistingUser){
    return redirect(`/chats/${session.id}`);
  }

  await db.sessionUser.create({
    data:{
      sessionId: session.id,
      userId
    }
  });

  return redirect(`/chats/${session.id}`);

}

export default InvitePage;
