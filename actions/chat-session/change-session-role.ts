"use server"

import { db } from "@/lib"
import { auth } from "@clerk/nextjs/server";
import { Access } from "@prisma/client";

type ChangeSessionRoleProps = {
  userId: string;
  role: Access;
  sessionId: string;
}

export const changeSessionRole = async ({ userId, role, sessionId }: ChangeSessionRoleProps) => {
  try {
    // chek if current user is admin
    const { userId : currentUserId } = auth();
    if (!currentUserId) {
      return {
        error: "You are not authorized"
      }
    }

    // check if user is admin
    const isAdmin = await db.sessionUser.findUnique({
      where: {
        userId_sessionId: {
          userId:currentUserId ,
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

    await db.sessionUser.update({
      where: {
        userId_sessionId: {
          userId,
          sessionId
        }
      },
      data: {
        access: role
      }
    }
    )

    return {
      success: "User role updated successfully"
    }
  }

  catch (error) {
    console.error("Error updating user role", error)
    return {
      error: "Error updating user role"
    }
  }
}
