import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex items-center   justify-between h-full mx-10 ">
      <div className="text-white font-light">Magic UI</div>

      <div className="flex gap-4 items-center">
        <Link href={"/"}>
          <Button
            variant={"ghost"}
            className="hover:bg-opacity-15 hover:bg-white"
          >
            Login
          </Button>
        </Link>

        <Link href={"/"}>
          <Button>sign up</Button>
        </Link>
      </div>
    </nav>
  );
};
