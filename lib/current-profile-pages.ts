import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";
import { redis } from "./redis";
import { User } from "@prisma/client";

export const currentProfilePage = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const cacheUser = await redis.get(userId);

  if (cacheUser) {
    return cacheUser as User;
  }


  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  await redis.set(userId, JSON.stringify(user), {
    ex: 60 * 15
  });

  return user;
};
