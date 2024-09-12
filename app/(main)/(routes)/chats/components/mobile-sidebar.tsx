
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import Sidebar from "./siderbar";
import { BiMenuAltLeft } from "react-icons/bi";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden block pr-4 hover:opacity-75 transition">
        <BiMenuAltLeft size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-10 ">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
