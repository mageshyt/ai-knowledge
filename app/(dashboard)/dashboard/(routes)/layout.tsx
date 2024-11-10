import React from "react";

import tw from "tailwind-styled-components";
import Navbar from "./components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper >
      
      <NavbarWrapper >
        <Navbar />
      </NavbarWrapper>

      {/* Main Content */}
      <main className="h-full pt-10 lg:pt-[70px]">{children}</main>
    </Wrapper>
  );
};

export default DashboardLayout;


const Wrapper = tw.div`h-screen`;


const NavbarWrapper = tw.div`fixed inset-y-0 z-50 h-[70px] w-full `;
