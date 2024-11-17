"use client";

import { currentProfile } from "@/lib/current-profile";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {

        const res=await currentProfile()
        setCurrentUser(res);
      }
    }

    return () => {
      fetchUser();
    }
  }, [user]);

  return { currentUser };

}
