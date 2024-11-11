import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

import { redis } from "./redis";
import { User } from "@prisma/client";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  // check if the user is in the cache
  const cacheUser = await redis.get(userId);


  if (cacheUser) {
    return cacheUser as User;
  }

  // if the user is not in the cache, fetch from the database


  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  // store the user in the cache
  await redis.set(userId, JSON.stringify(user), {
    ex: 60 * 15
  });
  return user;
};
