"use client";
import {  usePathname } from "next/navigation";
import { useAuth} from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import { getSessionUser } from "@/actions/sidebar/get-session-user";
import { SafesessionUser } from "@/typings/typing";

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Shield } from "lucide-react";
import ListView from "@/components/global/list-view";
import { SessionUserCard } from "./session-user";
import Show from "@/components/global/show";
import ClientWrapper from "@/components/global/client-wrapper";


export const ManageSession = () => {

  const pathname = usePathname()
  const { userId } = useAuth()

  const sessionId = pathname?.split('/')[2] || ''

  const {
    data: users,
    isError,
    isPending,
    error,
    refetch,
  } = useQuery<SafesessionUser[]>({
    queryKey: ["session-user", sessionId],
    queryFn: () => getSessionUser({ sessionId }),
    enabled: !!sessionId
  });


  // TODO : Add the UI for the settings sidebar
  if (isPending) return <div className="size-4 bg-background shadow-neutral-50  rounded-md" />

  if (isError) return <div>Error: {error.message}</div>


  const isAdmin = users?.find(user => user.userId === userId && user.access === 'ADMIN')


  return (
    <ClientWrapper>

      <Show>
        <Show.When
          isTrue={!!isAdmin}
        >

          <Sheet >
            <SheetTrigger asChild >
              <Button
                variant="ghost"
                className='size-8'
                size={'icon'}
              >
                <Shield
                  className="size-4 animate-pulse"
                />
              </Button>
            </SheetTrigger>
            <SheetContent>

              <SheetHeader>
                <SheetTitle>
                  Manage Chat Sesstion
                </SheetTitle>
                <SheetDescription>
                  Manage the chat session and its participants
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-4">
                <h3
                  className="text-sm font-semibold"
                >
                  Participants
                </h3>
                <ListView
                  items={users}
                  render={(user: SafesessionUser) =>
                    <SessionUserCard sessionUser={user}
                      refetch={refetch}
                    />}
                />
              </div>
            </SheetContent>

          </Sheet >
        </Show.When>
      </Show>
    </ClientWrapper>
  )
}

