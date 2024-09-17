'use client';
import { useState } from "react";
import { toast } from "sonner";

import { Check, Copy, RefreshCcw,  } from 'lucide-react'

import { useOrigin } from "@/hooks/use-origin";
import { useModal } from "@/hooks/use-modal";

import { Label } from "../ui/label";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createInvitation } from "@/actions/invite/create-invitation";

export const InviteModal = () => {
  // ----------------------------- context -----------------------------

  const { isOpen, onClose, type, data ,openModal} = useModal();

  const isModelOpen = isOpen && type === "invite-modal";

  const { inviteCode, sessionId } = data;

  const origin = useOrigin();

  // ----------------------------- state -----------------------------

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const inviteUrl = `${origin}/invite/${inviteCode}`;

  // ----------------------------- handlers -----------------------------
  //
  const copyInviteLink = () => {
    if (copied) return;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewLink = async () => {
    try{
      if(!sessionId) return;
      setLoading(true);
      const response=await createInvitation({sessionId});

      if ("error" in response) {
        toast.error(response.error);
      }

        toast.success("New link generated successfully");
        openModal("invite-modal", { inviteCode: response.invitationId, sessionId });

    }

    catch (error) {
      console.error(error);
      toast.error("Failed to generate new link");
    }
    finally {
      setLoading(false);
    }


  }



  return (
    <ResponsiveModal
      open={isModelOpen} onOpenChange={onClose}
    >
      <ResponsiveModalTrigger asChild>

      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle
            className="text-xl font-bold text-center"
          >
            Invite Friends
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Share the link with your friends to invite them to the chat
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>


        <div>
          <Label> Server Invite Link</Label>
          {/* Invite link */}
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={loading}
              value={inviteUrl}
              readOnly
            />
            {/* copy btn */}
            <Button disabled={loading} onClick={copyInviteLink} size="icon">
              {copied ? (
                <Check
                  className={
                    "text-neutral-600 transform font-bold  scale-110 ease-in duration-300 size-4"
                  }
                />
              ) : (
                <Copy className='size-4' />
              )}
            </Button>
          </div>

          {/* generate new link */}
          <Button
            variant={"link"}
            disabled={loading}
            onClick={generateNewLink}
            size={"sm"}
            className="mt-4 text-xs text-zinc-500"
          >
            Generate New Link
            <RefreshCcw className={ "ml-2 size-4"} />
          </Button>
        </div>


      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}

