import React from "react";
import Sidebar from "./components/siderbar";

import tw from "tailwind-styled-components";
import Navbar from "./components/navbar";

const ChatScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper >
      {/* Navbar */}
      <NavbarWrapper >
        <Navbar />
      </NavbarWrapper>

      {/* Sidebar */}

      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      {/* Main Content */}
      <main className="lg:pl-72 h-full pt-10 lg:pt-0">{children}</main>
    </Wrapper>
  );
};

export default ChatScreenLayout;


const Wrapper = tw.div`h-screen`;

const SidebarWrapper = tw.div`fixed inset-y-0 z-50 hidden h-full w-72 flex-col lg:flex  `;

const NavbarWrapper = tw.div`fixed inset-y-0 z-50 h-12 w-full block lg:hidden `;
