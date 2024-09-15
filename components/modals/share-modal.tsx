'use client';
import { useState } from "react";
import { toast } from "sonner";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Button } from "../ui/button";
import { Clipboard, RefreshCw, Share } from 'lucide-react'
import { Input } from "../ui/input";
import ActionTooltip from "../global/action-tooltip";
export const ShareModal = () => {
  // TODO: Generate a shareable Link
  const [shareableLink, setShareableLink] = useState<string>(window.location.href);

  return (
    <ResponsiveModal >
      <ResponsiveModalTrigger asChild>

        <Button
          variant={'ghost'}
          size='icon'
          className='size-8'
        >
          <Share
            className='size-4'
            aria-label='Share'
          />
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Share</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Share the link with your friends to invite them to the chat
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="relative">
          <Input
            value={shareableLink}
            readOnly
            className='mb-4'

          />
          <ActionTooltip label="Regenerate Link"
            align="end"
            side="bottom"
          >

            <Button
              variant={'ghost'}
              size={'icon'}
              className='absolute right-0 top-0 '
            >
              <RefreshCw className='size-4' />
            </Button>
          </ActionTooltip>
        </div>


        <ResponsiveModalFooter>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard");
            }}
          >
            <Clipboard className='size-4 mr-2' />
            Copy Link
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}

