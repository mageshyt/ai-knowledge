"use client";
import React, { FC, useState } from "react";
import { Plus } from "lucide-react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];


import { Input } from "@/components/ui/input";
import tw from "tailwind-styled-components";

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

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      handleSubmit(data);
      setInput("");
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="relative p-4 pb-6">
        {/* add media modal */}
        <PlusButton
          type="button"
        >
          <Plus className="text-white dark:text-[#31338]" />
        </PlusButton>

        <Input
          disabled={isLoading}

          onChange={handleInputChange}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit({ [name]: input });
            }
          }}


          placeholder={`Message ${name}`}
          className={"bg-zinc-200/90 dark:bg-white/5 border  focus-visible:ring-0 focus-visible:ring-offset-0 px-14 py-6"}
        />
      </div>
    </form>
    //</Form>
  );
};

export default ChatInput;

const PlusButton = tw.button`
absolute top-7 left-8 h-6 w-6 flex items-center justify-center bg-zinc-500 dark:bg-white/10 hover:bg-zinc-600 dark:hover:bg-zinc-300/30 rounded-full  p-1 transition-all duration-200 ease-in-out
`
