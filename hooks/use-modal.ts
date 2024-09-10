
import { create } from "zustand";

export type ModalType =
  | "confirm-modal"
  ;

interface ModalData {
  sessionId?: string;
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
