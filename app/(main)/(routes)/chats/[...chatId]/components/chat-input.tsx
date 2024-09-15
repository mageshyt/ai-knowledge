"use client";
import React, { FC, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { type useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import tw from "tailwind-styled-components";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

const ChatInput: FC<ChatInputProps> = ({ apiUrl, query, name, input, handleSubmit, handleInputChange, setInput }) => {
  const [isLoading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!input.trim()) return; // prevent empty submissions
      try {
        setLoading(true);
        handleSubmit();
        setInput(""); // Reset input field after submission
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [input, handleSubmit, setInput ]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="relative p-4">
        {/* Plus button for media upload */}
        <PlusButton type="button" aria-label="Add media">
          <Plus className="text-white dark:text-[#31338]" />
        </PlusButton>

        <MessageInput
          disabled={isLoading} // Disable input while loading
          onChange={handleInputChange}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent default form submission
              onSubmit(e);
            }
          }}
          placeholder={`Message ${name}`}
          className={
            ""
          }
        />
      </div>
    </form>
  );
};

export default ChatInput;

const PlusButton = tw.button`
  absolute top-7 left-8 h-6 w-6 flex items-center justify-center bg-zinc-500 
  dark:bg-white/10 hover:bg-zinc-600 dark:hover:bg-zinc-300/30 rounded-full 
  p-1 transition-all duration-200 ease-in-out
`;

const MessageInput = tw(Input)`
px-14 py-6 bg-zinc-200/90 dark:bg-white/5  
border-none focus-visible:ring-0 focus-visible:ring-offset-0
`
