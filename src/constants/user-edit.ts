// store/user-edit-store.ts
import { create } from "zustand";

type UserEditModalStore = {
  isOpen: boolean;
  userId: string | null;
  open: (id: string) => void;
  close: () => void;
};

export const useUserEditModal = create<UserEditModalStore>((set) => ({
  isOpen: false,
  userId: null,
  open: (id: string) => set({ isOpen: true, userId: id }),
  close: () => set({ isOpen: false, userId: null }),
}));
