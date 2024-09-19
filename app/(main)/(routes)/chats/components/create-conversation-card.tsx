"use client";

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createSession } from '@/actions/chat-session/create-session';

import { ArrowRight, Clipboard, Lock } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  contentUrl: z.string().url(),
  name: z.string(),
});

export const CreateConversationCard = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentUrl: '',
      name: '',
    }
  })

  const router = useRouter();
  const { isValid, isSubmitting } = form.formState


  // ---------------------------------- Handlers--------------------------------------

  const createConversation = async (data: z.infer<typeof formSchema>) => {

    if (!data.contentUrl.match(/(http|https):\/\/[^ "]+$/)) {
      toast.error('Please enter a valid URL');
      return;
    }
    try {

      const response = await createSession(data);
      if (response) {
        toast.success('Conversation created successfully');
        router.refresh()

        setTimeout(() => {
          router.push(`/chats/${response.id}`);
        }, 1000);

        form.reset();
      }
      else {
        toast.error('Error while creating conversation');
      }
    } catch (e) {
      console.error('Error while creating conversation ', e);
      toast.error('Error while creating conversation');
    }
  };

  const handlePaste = () => {
    if (!navigator.clipboard) {
      toast.error('Clipboard API not supported');
      return;
    }
    try {
      navigator.clipboard.readText().then((text) => {
        if (!text.match(/(http|https):\/\/[^ "]+$/)) {
          toast.error('Invalid URL');
          return;
        }
        form.setValue('contentUrl', text)
      });
    } catch (e) {
      console.error('Error while pasting URL ', e);
      toast.error('Error while pasting URL');
    }
  };


  return (

    <Card>
      <CardHeader>
        <CardTitle className='flex gap-2'>
          <Lock
            className=' size-6'
          />
          Enter URL for Content Exploration</CardTitle>
        <CardDescription>
          Provide a link to any web page, and our system will help you interact with its content.
        </CardDescription>
      </CardHeader>
      <CardContent className='relative'>
        {/* ------------------form ------------- */}
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(createConversation)}
            className='flex flex-col gap-4'
          >
            {/* ------------------session name------------- */}

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Session name'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ------------------content url------------- */}

            <FormField
              control={form.control}
              name="contentUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content URL</FormLabel>
                  <FormControl
                  >
                    <div className='relative'>
                      <Input
                        type="text"
                        placeholder="Content URL"
                        className="pr-8"
                        {...field}
                      />
                      <Clipboard
                        onClick={handlePaste}
                        className='absolute right-2 cursor-pointer top-[10px] text-muted-foreground size-5' />
                    </div>
                  </FormControl>
                </FormItem>
              )
              }
            />
            {/* ------------------submit button ------------- */}
            <Button
              disabled={!isValid || isSubmitting}
              className='w-full' >
              Start Conversation
              <ArrowRight className='size-4 ml-2' />
            </Button>
          </form>

        </Form>

      </CardContent>
    </Card>
  )
}

