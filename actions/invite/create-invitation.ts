"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuid } from "uuid";

type Invitation = {
  sessionId: string;
}
export const createInvitation = async ({sessionId}:Invitation) => {
  try{
    const {userId}=auth()

    if(!userId){
      return {
        error: "You must be logged in to create an invitation"
      }
    }

    // check he is the owner of the session
    const session = await db.chatSession.findUnique({
      where:{
        id:sessionId,
        userId,
      }
    });

    if(!session){
      return {
        error: "You do not have permission to create an invitation for this session"
      }
    }

    const newInvitationId = uuid();

    const updatedSession= await db.chatSession.update({
      where:{
        id:sessionId,
        userId:userId,
      },
      data:{
        inviteCode:newInvitationId
      }
    })


    return {
      invitationId:newInvitationId,
      sessionId:updatedSession.id
  }
  }
  catch(err){
    console.error(err);
    return {
      error: "An error occurred while creating the invitation"
    }
  }
}
