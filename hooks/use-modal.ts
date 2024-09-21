
import { create } from "zustand";

export type ModalType =
  | "confirm-modal"
  | "invite-modal"
  | "manage-archive-modal"
  ;

interface ModalData {
  sessionId?: string;
  inviteCode?: string;
  actionType?: "archive" | "delete";
  sessionName?: string;
  handleConfirm?: () => void;
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  openModal: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  openModal: (type: ModalType, data = {}) => {
    set({ type, isOpen: true, data });
  },
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
