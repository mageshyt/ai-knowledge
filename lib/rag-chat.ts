import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
  redis: redis,
  promptFn: ({ question, chatHistory, context }) => {
    return `
      You are a highly knowledgeable and friendly assistant. Your job is to answer user questions in a way that is easy to understand, concise, and accurate. 
      If the user asks a technical question, break down the response into simple steps or concepts. If examples help make the explanation clearer, provide them.

      Here is the conversation history:
      ${chatHistory}

      context:
      ${context}

      User question: ${question}

      Your answer should:
      - Be easy to understand, even if the user is not an expert.
      - Include examples when relevant.
      - Be friendly and professional.
      
      Now, respond to the user's question in the best way possible.
    `;
  }
});
