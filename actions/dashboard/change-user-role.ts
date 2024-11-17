"use server"
import { hasPermission } from '@/lib/auth-rabc';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { ROLE } from '@prisma/client';

export const updateUserRole = async (changeUserId: string, role: ROLE) => {
  try {


    const currentUser = await currentProfile()

    if (!currentUser) {

      return {
        error: "unauthorized"
      }
    }


    const user = await db.user.findUnique({
      where: {
        id: changeUserId,
      },
    })

    if (!user) {
      return {
        error: "user not found",
      }
    }
    // Permission checks
    if (
      role === "SUPERADMIN" &&
      !hasPermission(currentUser, "update:superAdmin")
    ) {
      return { error: "You are not authorized to assign the SUPERADMIN role." };
    }

    if (!hasPermission(currentUser, "update:admin")) {
      return { error: "You are not authorized to update user roles." };
    }    // if the user already has the role then remove it



    if (user.roles.includes(role)) {

      await db.user.update({
        where: {
          id: changeUserId,

        },

        data: {
          roles: {
            set: user.roles.filter((r) => r != role)
          }
        }
      })
    }

    else {
      await db.user.update({
        where: {
          id: changeUserId,

        },

        data: {
          roles: {
            push: role
          }
        }
      })


    }

  }
  catch (error) {
    console.log(error)

    return {
      error: "something went wrong"
    }
  }
}
