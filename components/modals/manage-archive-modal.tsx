'use client';

import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { updateSession } from "@/actions/chat-session/update-session";
import { deleteSession } from "@/actions/chat-session/delete-session";
import { getAchivedChatSession } from "@/actions/sidebar/get-archived-session";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Button } from "../ui/button";
import Show from "../global/show";
import Loader from "../global/loader";
import { ChatSession } from "@prisma/client";
import { ArchiveRestore, TrashIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export const ManageSessionModal = () => {
  // ----------------------------- context -----------------------------

  const { isOpen, onClose, type } = useModal();

  const isModelOpen = isOpen && type === "manage-archive-modal";

  const router = useRouter();

  const {
    data: { chats } = { chats: [] },
    refetch,
    isLoading,
  } = useQuery<{
    chats: ChatSession[]
  }>({
    queryKey: ["archived-session"],
    queryFn: () => getAchivedChatSession(),
  })

  const [loading, setLoading] = useState(false);

  // ----------------------------- handlers -----------------------------
  const handleRestore = async(sessionId:string) => {
    setLoading(true);
    try{

      // restore the session
      const response = await updateSession({
        sessionId,
        value: {
          archived: false
        }
      });

      if("error" in response!){
        toast.error(response.error);
        return;
      }

      // refetch the archived sessions
      await refetch();
      router.refresh();

      // show success message
      toast.success("Session restored successfully");
    }
    catch(e){
      console.error(e);
      toast.error("Failed to restore the session");
    }
    finally{
      setLoading(false);
    }
  }

  const handleDelete = async(sessionId:string) => {
    setLoading(true);
    try{

      // delete the session
      const response = await deleteSession({
        sessionId,
      });

      if("error" in response!){
        toast.error(response.error);
        return;
      }

      // refetch the archived sessions
      await refetch();

      // show success message
      toast.success("Session deleted successfully");
    }
    catch(e){
      console.error(e);
      toast.error("Failed to delete the session");
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <ResponsiveModal
      open={isModelOpen} onOpenChange={onClose}
    >
      <ResponsiveModalTrigger asChild>

      </ResponsiveModalTrigger>

      <ResponsiveModalContent
        className="overflow-y-auto"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle
            className="text-lg font-bold text-center"
          >
            Manage Archived Chat Sessions

          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="text-center text-sm">
            Here you can view and manage your archived chat sessions
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>


        <ScrollArea
          className="overflow-y-auto max-h-96"
        >
          {/* List of Arched Session*/}
          <Show>
            <Show.When
              isTrue={isLoading}
            >
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            </Show.When>

            <Show.When
              isTrue={!isLoading && chats.length === 0}
            >
              <div className="flex justify-center items-center">
                <p className="text-center text-sm">No archived chat sessions</p>
              </div>
            </Show.When>

            <Show.When
              isTrue={!isLoading && chats.length > 0}
            >

              {/* List of archived chat sessions */}
              <div>
                {/* headers */}
                <div className="flex mb-1 justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">Name</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold">Created At</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold">Actions</p>
                  </div>
                </div>

                {chats.map((chat) => (
                  <div key={chat.id} className="flex justify-between items-center">
                    {/* chat name */}
                    <div>
                      <p className="text-xs text-muted-foreground font-bold">{chat.name}</p>
                    </div>

                    {/* chat created At */}
                    <div>
                      <p className="text-xs text-muted-foreground">{
                        new Date(chat.createdAt).toLocaleDateString()
                      }</p>
                    </div>

                    {/* chat actions */}
                    <div>
                      <Button
                        disabled={loading}
                        size="icon"
                        variant={"ghost"}
                        className="size-8"
                        onClick={() => handleRestore(chat.id)}
                      >
                        <ArchiveRestore
                          className=" size-4"
                        />
                      </Button>
                      <Button
                        disabled={loading}
                        size="icon"
                        variant={"ghost"}
                        className="size-8"
                        onClick={() => handleDelete(chat.id)}
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Show.When>


          </Show>
        </ScrollArea>

      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}

