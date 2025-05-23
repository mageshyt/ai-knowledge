import { SessionUser, User } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Message } from "postcss";
import { Server as SocketIoServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};


export type SafesessionUser = SessionUser & {
  user: User
}

export type MessageWithUserProfile=Message & {
  user: User | null
}
