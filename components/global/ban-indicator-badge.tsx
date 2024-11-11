import React from "react";
import { Badge } from "@/components/ui/badge";
import { currentProfile } from "@/lib/current-profile";

export const BanIndicatorBadge = async () => {
  const user = await currentProfile()
  return (
    user?.isBlocked && (
      <Badge
        variant={"outline"}
        className="bg-red-600 text-white border-none"
      >
        Banned
      </Badge>
    )
  );

};

