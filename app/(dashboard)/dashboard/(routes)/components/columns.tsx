"use client";

import UserAvatar from "@/components/global/user-avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./action";
import { Switch } from "@/components/ui/switch";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",

    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-2">
          <UserAvatar
            className="group-hover:scale-110 transition"
            imageUrl={
              (user?.attributes as any)?.has_image
                ? (user?.attributes as any)?.imageUrl
                : ""
            }
            alt="user avatar"
            fallback={user?.name?.[0] ?? "T"}
          />
          <div className="flex flex-col">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs">{user?.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.roles.map((role) => (
            <Badge
              key={role}
              variant={
                role === "ADMIN"
                  ? "default"
                  : role === "SUPERADMIN"
                    ? "default"
                    : "secondary"
              }
              className="mr-2"
            >
              {role}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Blocked",
    cell: ({ row }) => <Switch checked={row.original.isBlocked} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
