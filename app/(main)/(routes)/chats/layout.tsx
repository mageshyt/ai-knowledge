import React from "react";
import Sidebar from "./components/siderbar";

const ChatScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-y-0 z-50 hidden h-full   w-72 flex-col lg:flex  ">
        <Sidebar />
      </div>
      <main className="pl-72 h-full">{children}</main>
    </div>
  );
};

export default ChatScreenLayout;
