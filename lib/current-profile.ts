import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentProfile = () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};
