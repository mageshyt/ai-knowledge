
import React from "react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="flex bg-background items-center p-4 border-b h-full ">
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
