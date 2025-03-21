import { db } from "@/lib";
import { ragChat, redis } from "@/lib";
import React from "react";
import { ChatWrapper } from "./components/chat-wrapper";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = async ({ params }: PageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // check if the user has permission to access the chat

  const hasPermission = await db.sessionUser.findUnique({
    where: {
      userId_sessionId: {
        userId: userId,
        sessionId: params.chatId.toString(),
      },
    },
  });

  if (!hasPermission) {
    return redirect("/");
  }

  const contents = await db.content.findMany({
    where: {
      chatId: params.chatId.toString(),
    },
  });

  const ragChatContent = contents.map((content) => {
    return {
      source: content.contentUrl,
      type: content.contentType === "WEB" ? "html" : "text",
      config: { chunckOverlap: 50, chunckSize: 200 },
    };
  });

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    ragChatContent[0].source
  );

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      source: ragChatContent[0].source,
      type: "html",
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", ragChatContent[0].source);
  }

  return (
    <ChatWrapper
      sessionId={params.chatId}
      hasPermission={
        hasPermission.access === "ADMIN" ||
        hasPermission.access === "READ_WRITE"
      }
    />
  );
};

export default ChatPage;
