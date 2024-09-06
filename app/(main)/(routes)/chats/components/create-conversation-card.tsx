
"use client";

import { toast } from 'sonner';
import { useState } from 'react';

import { ArrowRight, Clipboard,  Lock  } from 'lucide-react';

import { Card,
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



  // ---------------------------------- Handlers--------------------------------------

  // TOOD : backend call to create the Conversation
  const createConversation = () => {
    toast.info('TODO: Backend call to create a conversation');
    console.log('Creating a conversation');
  }

  const handlePaste = () => {
    try{
      navigator.clipboard.readText().then((text) => {
        // check if the text is a valid URL
        if (!text.match(/(http|https):\/\/[^ "]+$/)){
          toast.error('Invalid URL');
          return;
        }

        setUrl(text);
      });
    }
    catch(e){
      console.error('Error while pasting URL ', e);
      toast.error('Error while pasting URL');
    }
  }


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
          onClick={createConversation}
          className='w-full' >
            Start Conversation
            <ArrowRight className='size-4 ml-2' />
          </Button>
        </CardFooter>
      </Card>
  )
}

