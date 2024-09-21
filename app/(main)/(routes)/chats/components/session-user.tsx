"use client";

import { useState } from "react";

import { Ellipsis, Eye, Gavel, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import tw from "tailwind-styled-components";

import { SafesessionUser } from "@/typings/typing";

import UserAvatar from "@/components/global/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Access } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import Show from "@/components/global/show";
import { changeSessionRole } from "@/actions/chat-session/change-session-role";
import ActionTooltip from "@/components/global/action-tooltip";
import { useRouter } from "next/navigation";
import { removeSessionUser } from "@/actions/chat-session/remove-session-user";

type SessionUserProps = {
  sessionUser: SafesessionUser;
  refetch: () => Promise<any>;
};

const roleIconMap: Record<Access, JSX.Element> = {
  READ: <Eye className="w-4 h-4 ml-2" />,
  READ_WRITE: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-400" />,
  ADMIN: <ShieldAlert className="w-4 h-4 ml-2 text-rose-400" />,
};

const roleToText: Record<Access, string> = {
  READ: "View Only",
  READ_WRITE: "Full Access",
  ADMIN: "Admin",
};

export const SessionUserCard = ({ sessionUser, refetch }: SessionUserProps) => {
  // ----------------------State----------------------
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  // ----------------------Handlers----------------------
    const handleRoleChange = async (userId: string, role: Access) => {
    setLoading(true);
    try {
      const response = await changeSessionRole({ userId, role, sessionId: sessionUser.sessionId });
      if ("error" in response) throw new Error(response.error);

      toast.success("User role updated successfully");
      await refetch();
      router.refresh();
    } catch (error) {
      console.error("Error updating user role", error);
      toast.error("Error updating user role");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    setLoading(true);
    try {
      const response = await removeSessionUser({
        userId,
        sessionId: sessionUser.sessionId,
      });
      if ("error" in response) throw new Error(response.error);

      toast.success("User removed successfully");
      await refetch();
      router.refresh();
    } catch (error) {
      console.error("Error removing user", error);
      toast.error("Error removing user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper key={sessionUser.id}>
      <ProfileContainer>
        {/* user profile */}
        <UserAvatar
          imageUrl={`https://api.dicebear.com/9.x/initials/svg?seed=${sessionUser.user?.name}&fontSize=36`}
          alt={sessionUser.user?.name || ""}
          fallback={sessionUser.user?.name?.charAt(0) || "K"}
          className="border-none"
        />

        {/* user detail*/}

        <DetailContainer>
          <UserRole>
            {sessionUser.user.name}
            <ActionTooltip
              label={roleToText[sessionUser.access]}
            >

              {roleIconMap[sessionUser.access]}
            </ActionTooltip>
          </UserRole>
          <UserEmail>{sessionUser.user.email}</UserEmail>
        </DetailContainer>
      </ProfileContainer>

      {/* user permission*/}
      <Show>
        <Show.When isTrue={loading}>
          <Loader2 className="size-6 animate-spin" />
        </Show.When>
        <Show.When isTrue={ sessionUser.userId !== userId}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom">
              <DropdownMenuLabel>Change User Role</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() =>
                  handleRoleChange(sessionUser.userId, Access.READ_WRITE)
                }
              >
                Full Access
                {roleIconMap.READ_WRITE}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleRoleChange(sessionUser.userId, Access.READ)}
              >
                View Only
                {roleIconMap.READ}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleRemoveUser(sessionUser.userId)}
              >
                Remove
                <Gavel className="w-4 h-4 ml-2 text-rose-400" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </Show.When>
      </Show>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex items-center gap-2 justify-between`;

const DetailContainer = tw.div`flex flex-col gap-y-1`;

const UserRole = tw.div`flex items-center text-sm capitalize font-semibold`;

const ProfileContainer = tw.div`flex items-center gap-2`;

const UserEmail = tw.p`text-xs text-muted-foreground`;
