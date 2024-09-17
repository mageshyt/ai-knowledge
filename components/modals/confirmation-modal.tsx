"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModal } from "@/hooks/use-modal";

import React from "react";

export const ConfirmModal= () => {
  const { type, onClose, data } = useModal();

  const isOpenModel = type === "confirm-modal";
  const { handleConfirm, actionType,sessionName } = data;

  const label = actionType === "archive" ? "Archive " : "Delete ";

  return (
    <AlertDialog open={isOpenModel} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            You are about to {label}  
            this {' '}
            <span className="font-bold text-primary">#{sessionName}</span>. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
