import { create } from 'zustand';

interface F1ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useF1Modal = create<F1ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useF1Modal;
