"use client";

import React from "react";
import {
  CircleCheck,
  MoreHorizontal,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/user-current-user";
import { hasPermission } from "@/lib/auth-rabc";
import { toast } from "sonner";
import { updateUserRole } from "@/actions/dashboard/change-user-role";
import { blockUser } from "@/actions/dashboard/block-user";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  if (!currentUser) return null;

  const handleUpdateUser = async (type: "ADMIN" | "SUPERADMIN") => {
    try {
      const res = await updateUserRole(data.id, type);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.info("Role update successfully");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleBlockUser = async () => {
    try {
      const res = await blockUser(data.id);

      if (res?.error) {
        return toast.error(res.error);
      }

      toast.info(res.message);

      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* UPDATE USER ROLE */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShieldQuestion className="w-4 h-4 mr-2" />
            <span className="text-sm">Role</span>
          </DropdownMenuSubTrigger>

          {/* portal */}
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {/* ADMIN */}

              <DropdownMenuItem
                disabled={!hasPermission(currentUser, "update:user")}
                className="text-indigo-400"
                onClick={() => handleUpdateUser("ADMIN")}
              >
                <ShieldCheck className="w-4 h-4 mr-2 " />
                ADMIN
                {data.roles.includes("ADMIN") && (
                  <CircleCheck className="w-4 h-4 ml-auto" />
                )}
              </DropdownMenuItem>

              {/* SUPERADMIN */}

              <DropdownMenuItem
                disabled={!hasPermission(currentUser, "update:superAdmin")}
                className="text-green-400"
                onClick={() => handleUpdateUser("SUPERADMIN")}
              >
                <ShieldAlert className="w-4 h-4 mr-2" />
                SUPERADMIN
                {data.roles.includes("SUPERADMIN") && (
                  <CircleCheck className="w-4 h-4 ml-auto" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* BLOCK USER */}
        <DropdownMenuItem className="text-red-400" onClick={handleBlockUser}>
          <ShieldBan className="w-4 h-4 mr-2" />
          {data.isBlocked ? "Unblock" : "Block"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
