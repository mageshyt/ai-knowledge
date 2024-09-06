import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
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
      </div>
    </nav>
  );
};
