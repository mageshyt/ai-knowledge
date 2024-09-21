"use server"

import { db } from "@/lib"
import { auth } from "@clerk/nextjs/server";
import { Access } from "@prisma/client";

type RemoveSessionUserProps = {
  userId: string;
  sessionId: string;
}

export const removeSessionUser= async ({ userId, sessionId }: RemoveSessionUserProps) => {
  try {
    // chek if current user is admin
    const { userId: currentUserId } = auth();
    if (!currentUserId) {
      return {
        error: "You are not authorized"
      }
    }

    // check if user is admin
    const isAdmin = await db.sessionUser.findUnique({
      where: {
        userId_sessionId: {
          userId: currentUserId,
          sessionId
        },
        access: Access.ADMIN
      }
    })

    if (!isAdmin) {
      return {
        error: "You are not authorized"
      }
    }

    await db.sessionUser.delete({
      where: {
        userId_sessionId: {
          userId,
          sessionId
        }
      }
    }
    )

    return {
      success: "User removed"
    }

  }

  catch (error) {
    console.error("[Error updating user role]", error)
    return {
      error: "Error removing user"
    }
  }
}
