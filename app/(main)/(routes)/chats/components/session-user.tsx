"use client";

import { Ellipsis, Eye, Gavel, ShieldAlert, ShieldCheck } from "lucide-react";
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

type SessionUserProps = {
  sessionUser: SafesessionUser;
};

const roleIconMap = {
  READ: <Eye className="w-4 h-4 ml-2" />,
  READ_WRITE: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-400" />,
  ADMIN: <ShieldAlert className="w-4 h-4 ml-2 text-rose-400" />,
};

export const SessionUserCard = ({ sessionUser }: SessionUserProps) => {
  const handleRoleChange = (userId: string, role: Access) => {
    toast.info("Not implemented yet");
  };

  const handleRemoveUser = (userId: string) => {
    toast.info("Not implemented yet");
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
            {roleIconMap[sessionUser.access]}
          </UserRole>
          <UserEmail>{sessionUser.user.email}</UserEmail>
        </DetailContainer>
      </ProfileContainer>

      {/* user permission*/}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuLabel>Change Role</DropdownMenuLabel>

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
    </Wrapper>
  );
};

const Wrapper = tw.div`flex items-center gap-2 justify-between`;

const DetailContainer= tw.div`flex flex-col gap-y-1`;

const UserRole = tw.div`flex items-center text-sm capitalize font-semibold`;

const ProfileContainer = tw.div`flex items-center gap-2`;

const UserEmail = tw.p`text-xs text-muted-foreground`;
