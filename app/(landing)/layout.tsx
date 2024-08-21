import React, { ReactNode } from "react";
import { Navbar } from "./components/navbar";

const LandingPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen bg-black">
      <header className="inset-y-0 fixed z-50 h-16 w-full  border-white/25 border-b-[.7px] bg-black/5 backdrop-blur-sm">
        <Navbar />
      </header>
      <main className="pt-20 h-full">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
