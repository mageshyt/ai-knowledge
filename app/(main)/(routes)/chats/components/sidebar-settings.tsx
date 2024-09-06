import tw from "tailwind-styled-components";
import { Archive, LogOut, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/global/theme-toogle";

export const SidebarSettings = () => {
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {/* theme button */}
      <ThemeToggle />

      <SettingButton href="">
        <User className="size-4 mr-2 transition duration-700 " />
        My account
      </SettingButton>

      <SettingButton href="">
        <Archive className="size-4 mr-2 transition duration-700 " />
        Archives
      </SettingButton>

      <SettingButton href="">
        <LogOut className="size-4 mr-2 transition duration-700 " />
        Logout
      </SettingButton>
    </div>
  );
};

const SettingButton = tw(
  Link
)`w-full flex items-start transition hover:dark:text-white group  hover:text-gray-400  p-2 hover:dark:bg-gray-100/20 rounded-md font-light text-sm text-muted-foreground`;
