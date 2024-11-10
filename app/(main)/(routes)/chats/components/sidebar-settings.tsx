"use client";
import tw from "tailwind-styled-components";
import { Archive, LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as themeToogle from "@/components/global/theme-toogle";
import { useModal } from "@/hooks/use-modal";
import { SignOutButton } from "@clerk/nextjs";
import { User as UserType } from "@prisma/client";
import Show from "@/components/global/show";

interface SidebarSettingsProps {
  user: UserType ;
}
export const SidebarSettings = ({
  user
}: SidebarSettingsProps) => {
  const { openModal } = useModal();
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {/* theme button */}
      <themeToogle.ThemeToggle />
      {/* ADMIN setting */}
      <Show>
        <Show.When isTrue={user?.roles.includes('SUPERADMIN')  || user.roles.includes("ADMIN")}>


          <SettingButton href="/dashboard">

            <User className="size-4 mr-2 transition duration-700 " />
            My account (Admin)
          </SettingButton>
        </Show.When>
      </Show>

      <ArchiveButton onClick={() => openModal("manage-archive-modal")} >
        <Archive className="size-4 mr-2 transition duration-700 " />
        Archives
      </ArchiveButton>

      <SignOutButton>
        <SettingButton href="">
          <LogOut className="size-4 mr-2 transition duration-700 " />
          Logout
        </SettingButton>
      </SignOutButton>
    </div >
  );
};

const SettingButton = tw(
  Link
)`

font-light text-sm text-muted-foreground

w-full flex items-start transition  p-2 rounded-md 
hover:dark:text-white group  hover:text-gray-400  hover:dark:bg-gray-100/20 
`;

const ArchiveButton = tw.button`w-full flex items-start transition 
hover:dark:text-white group  hover:text-gray-400
p-2 hover:dark:bg-gray-100/20 rounded-md
font-light text-sm text-muted-foreground`;
