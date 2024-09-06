import ShinyButton from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar =async () => {
  const {userId}=auth();
  return (
    <nav className="flex items-center   justify-between h-full mx-10 ">
      <div className="text-white font-light">
      <Image
        src="/logo.svg"
        alt="logo"
        width={50}
        height={40}
        className="cursor-pointer"
      />
      </div>

      <div className="flex gap-4 items-center">
        {
          userId ? 
          <Link

          href={"/chats"}
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none  "
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {userId ? "Dashboard" : "Get Started"}
          </span>
        </Link>
          :
            <>
        <Link href={"/sign-in"}>
          <Button
            variant={"ghost"}
            className="hover:bg-opacity-15 hover:bg-white"
          >
            Login
          </Button>
        </Link>

        <Link href={"/sign-up"}>
          <Button size="sm">sign up</Button>
        </Link>
              </>
        }
      </div>
    </nav>
  );
};
