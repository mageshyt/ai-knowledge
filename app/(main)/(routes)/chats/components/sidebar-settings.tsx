"use client";
import tw from "tailwind-styled-components";
import { Archive, LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as themeToogle from "@/components/global/theme-toogle";
import { useModal } from "@/hooks/use-modal";
import { SignOutButton } from "@clerk/nextjs";

export const SidebarSettings = () => {
  const { openModal, } = useModal()
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {/* theme button */}
      <themeToogle.ThemeToggle />

      <SettingButton href="">

        <User className="size-4 mr-2 transition duration-700 " />
        My account
      </SettingButton>

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
)`w-full flex items-start transition hover:dark:text-white group  hover:text-gray-400  p-2 hover:dark:bg-gray-100/20 rounded-md font-light text-sm text-muted-foreground`;

const ArchiveButton = tw.button`w-full flex items-start transition 
hover:dark:text-white group  hover:text-gray-400
p-2 hover:dark:bg-gray-100/20 rounded-md
font-light text-sm text-muted-foreground`;
