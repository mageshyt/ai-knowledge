"use client";

import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { createSession } from '@/actions/chat-session/create-session';

import { ArrowRight, Clipboard, Lock } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const CreateConversationCard = () => {

  const [url, setUrl] = useState('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  // ---------------------------------- Handlers--------------------------------------

  const createConversation = async () => {
    if (!url || !url.match(/(http|https):\/\/[^ "]+$/) || isPending) {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      startTransition(async () => {
        const response = await createSession({ contentUrl: url });
        if (response) {
          toast.success('Conversation created successfully');
          router.push(`/chats/${response.id}`);
          setUrl('');  // Clear input field
        }
      });
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
        setUrl(text);
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
        <Input
          type="text"
          placeholder="Enter URL here"
          className="pr-8"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Clipboard
          onClick={handlePaste}
          className='absolute right-8 cursor-pointer top-[10px] text-muted-foreground size-5' />

      </CardContent>
      <CardFooter>
        <Button
          disabled={isPending || !url || !url.match(/(http|https):\/\/[^ "]+$/)}
          onClick={createConversation}
          className='w-full' >
          Start Conversation
          <ArrowRight className='size-4 ml-2' />
        </Button>
      </CardFooter>
    </Card>
  )
}

