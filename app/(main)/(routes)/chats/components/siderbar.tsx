import tw from "tailwind-styled-components";
import React from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarSettings } from "./sidebar-settings";
import { SideBarRoutes } from "./sidebar-routes";
import Link from "next/link";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const Sidebar = async () => {
  const user = await currentProfile();
  if (!user) {
    return redirect("/");
  }

  return (
    <Wrapper>
      <div className="w-full p-4">
        <Link
          href={`/chats`}
        >
          <Button className="w-full bg-primary rounded-xl">

            <Plus className="size-6 mr-2" />
            New Chat
          </Button>
        </Link>
      </div>

      <Routes>
        {/* <SidebarRoutes /> */}
        <SideBarRoutes />
      </Routes>

      {/* setting */}
      <SettingWrapper>
        <SidebarSettings
          user={user}
        />
      </SettingWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = tw.div`h-full  border-r
flex flex-col justify-between
overflow-y-hidden shadow-sm  relative`;

const Routes = tw.div`w-full max-h-[calc(100%-300px)]
flex-1 flex flex-col 
justify-start  overflow-y-auto
`;

const SettingWrapper = tw.div` border-t w-full `;
