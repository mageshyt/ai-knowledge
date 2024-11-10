import React, { ReactNode } from "react";
import { Navbar } from "./components/navbar";

const LandingPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen scrollbar-none overflow-y-scroll bg-neutral-950">
      <header className="inset-y-0 fixed z-50 h-16 w-full  border-white/25 border-b-[.7px] bg-black/5 backdrop-blur-sm">
        <Navbar />
      </header>
      <main className="pt-20 pb-20">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
