"use client";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../modals/confirmation-modal";
import { InviteModal } from "../modals/invite-modal";
import { ManageSessionModal } from "../modals/manage-archive-modal";

export const ModalProvider = () => {
  // Hydration Fix
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ConfirmModal/>
      <InviteModal/>
      <ManageSessionModal/>
    </>
  );
};
