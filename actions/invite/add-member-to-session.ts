
"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

type AddMemberProps= {
  sessionId: string;
  userId: string;
}

export const addMemberToSession = async ({sessionId,userId}:AddMemberProps) => {
  try{
    const {userId}=auth()

    if(!userId){
      return {
        error: "You must be logged in to create an invitation"
      }
    }

    // create a shared session
    const isAlreadyExist=await db.sessionUser.findUnique({
      where:{
        userId_sessionId:{
          sessionId,
          userId
        }
      }
    })

    if(isAlreadyExist){
      return {
        error: "You are already a member of this session"
      }
    }

    // add the user to the session

    const sessionUser=await db.sessionUser.create({
      data:{
        userId,
        sessionId,
        access:'READ'
      }
    })

    return sessionUser;

  }
  catch(err){
    console.error(err);
    return {
      error: "An error occurred while creating the invitation"
    }
  }
}
