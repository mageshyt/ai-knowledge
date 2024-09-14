import { db } from "@/lib";
import { ragChat, redis } from "@/lib";
import React from "react";
import { ChatWrapper } from "./components/chat-wrapper";

interface PageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = async ({ params }: PageProps) => {

  const contents = await db.content.findMany({
    where: {
      chatId: params.chatId.toString(),
    },
  });

  const ragChatContent = contents.map((content) => {
    return {
      source: content.contentUrl,
      type: content.contentType === "WEB" ? "html" : "text",
      config: { chunckOverlap: 50, chunckSize: 200 }
    };
  }
  );
  const isAlreadyIndexed = await redis.sismember("indexed-urls", ragChatContent[0].source);

  if (!isAlreadyIndexed) {
    await ragChat.context.add(
      {
        source: ragChatContent[0].source,
        type: "html",
        config: { chunkOverlap: 50, chunkSize: 200 }
      }
    )
    await redis.sadd("indexed-urls", ragChatContent[0].source);
  }



  return <ChatWrapper sessionId={params.chatId} />;
};

export default ChatPage;
