"use server"
import { hasPermission } from '@/lib/auth-rabc';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export const blockUser = async (blockUserId: string) => {
  try {

    const user = await currentProfile()

    if (!user) {
      return { error: "Unauthorized: Please log in." };

    }

    // PREVENT SELF BLOCKING
    if (user.id === blockUserId) {

      return { error: "You cannot block yourself." }
    }

    // ONLY ADMINS , SUPER ADMIN CAN BLOCK USERS
    if (!hasPermission(user, "block:user") || !hasPermission(user, "block:admin")) {

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
      return { error: "The user you are trying to block does not exist." };
    }

    if (userToBlock.roles.includes("SUPERADMIN")) {
      return {
        error: "You are not authorized to block this user"
      }
    }

    const updatedUser = await db.user.update({
      where: {
        id: blockUserId,
      },
      data: {
        isBlocked: !userToBlock.isBlocked,
      },
    })


    return {
      success: true,
      message: `User ${updatedUser.isBlocked ? "blocked" : "unblocked"} successfully.`,
    }

  }
  catch (error) {
    console.log(error)

    return {
      error: "something went wrong"
    }
  }
}
