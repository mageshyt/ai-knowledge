"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import qs from "query-string";
import tw from "tailwind-styled-components";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  sessionId: string;
}

const fontSchema = z.object({
  // remove tags
  content: z
    .string()
    .min(1)
    .max(2000)
    .transform((val) => val.replace(/<[^>]*>/g, "")),
});

const ChatInput: FC<ChatInputProps> = ({ apiUrl, query, name, sessionId }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof fontSchema>>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(fontSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, {
        content: data.content,
        sessionId: sessionId,
        role: "user",
      });

      form.reset();

      const { data: aiResponse } = await axios.post("/api/chat-stream", {
        content: data.content,
        sessionId: sessionId,
      });

      // create message - for bot

      await axios.post(url, {
        content: aiResponse,
        sessionId: sessionId,
        role: "bot",
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4">
                  {/* Plus button for media upload */}
                  <PlusButton type="button" aria-label="Add media">
                    <Plus className="text-white dark:text-[#31338]" />
                  </PlusButton>

                  <MessageInput
                    {...field}
                    disabled={isLoading}
                    placeholder={`send Message #${name}`}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
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
`;
