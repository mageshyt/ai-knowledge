import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex items-center   justify-between h-full mx-10 ">
      <div className="text-white font-light">Magic UI</div>

      <div className="flex gap-4 items-center">
        <Link className="text-white" href={"/"}>
          Login
        </Link>

        <Link
          className="text-white bg-neutral-800 px-4 p-2 rounded-md"
          href={"/"}
        >
          sign up
        </Link>
      </div>
    </nav>
  );
};
