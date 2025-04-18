"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientWrapper from "./client-wrapper";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <ClientWrapper>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <button
          className="w-full flex  items-center justify-start p-2 hover:bg-gray-100/20 rounded-md font-light text-sm text-muted-foreground outline-none"
        >
          {theme == "dark" ? (
            <Moon className="size-4  scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
          )}
          <span className="">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </ClientWrapper>
  );
}
