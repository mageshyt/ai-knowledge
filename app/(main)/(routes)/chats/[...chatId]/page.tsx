import { db } from "@/lib";
import { ragChat } from "@/lib/rag-chat";
import React from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = async ({ params }: PageProps) => {
  console.log("params", params);
  const contents = await db.content.findMany({
    where: {
      chatId: params.chatId.toString(),
    },
  });
  console.log("contents", contents);

  const ragChatContent = contents.map((content) => {
    return {
      source: content.contentUrl,
      type: content.contentType === "WEB" ? "html" : "text",
    };
  }
  );

  // TODO : Add the chatId to the chat

  return <div className="p-4">current page is {params.chatId}</div>;
};

export default ChatPage;
