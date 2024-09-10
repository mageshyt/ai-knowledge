import tw from "tailwind-styled-components";
import React from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarSettings } from "./sidebar-settings";
import { SideBarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <Wrapper>
      <div className="w-full p-4">
        <Button className="w-full bg-primary rounded-xl">
          <Plus className="size-6 mr-2" />
          New Chat
        </Button>
      </div>

      <Routes>
        {/* <SidebarRoutes /> */}
        <SideBarRoutes />
      </Routes>

      {/* setting */}
      <SettingWrapper>
        <SidebarSettings />
      </SettingWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = tw.div`h-full  border-r flex flex-col  overflow-y-auto  shadow-sm justify-between  relative`;

const Routes = tw.div`flex flex-col w-full justify-start h-full`;

const SettingWrapper = tw.div` border-t w-full `;
