import {  getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";

export const currentProfilePage = (req:NextApiRequest) => {
  const { userId } = getAuth(req);

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
