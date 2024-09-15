import React from "react";
import MobileSidebar from "./mobile-sidebar";
import { SocketIndicatorBadge } from "@/components/global/socket-indicator-badge";

const Navbar = () => {
  return (
    <div className="flex bg-background justify-between items-center p-4 border-b h-full ">
      <MobileSidebar />
      <div className="flex-grow"></div>
      <SocketIndicatorBadge />
    </div>
  );
};

export default Navbar;
