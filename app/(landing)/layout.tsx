import React, { ReactNode } from "react";
import { Navbar } from "./components/navbar";

const LandingPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen bg-black">
      <main className="pt-20 h-full">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
