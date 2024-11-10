"use server"
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const blockUser = async (blockUserId: string) => {
  try {

    const { userId } = auth()

    if (!userId) {
      return {
        error: "UNAUTHORIZED",
      }
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    // SELF BLOCK NOT ALLOWED
    if (userId === blockUserId) {
      return {
        error: "You cannot block yourself",
      }
    }

    if (!user) {
      return {
        error: "User not found",
      }
    }

    // ONLY ADMINS , SUPER ADMIN CAN BLOCK USERS
    if (!user.roles.includes("ADMIN") && !user.roles.includes("SUPERADMIN")) {
      return {
        error: "You are not authorized to block users",
      }
    }




    const userToBlock = await db.user.findUnique({
      where: {
        id: blockUserId,
      },
    })

    if (!userToBlock) {
      return {
        error: "user not found",
      }
    }

    if (userToBlock.roles.includes("ADMIN")) {
      return {
        error: "You are not authorized to block this user"
      }
    }

    await db.user.update({
      where: {
        id: blockUserId,
      },
      data: {
        isBlocked: !userToBlock.isBlocked,
      },
    })


    return {
      success: true,
    }

  }
  catch (error) {
    console.log(error)

    return {
      error: "something went wrong"
    }
  }
}
