import { create } from 'zustand';

interface UpdateModalStore {
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
  trackId: number | null;
}

const useUpdateModal = create<UpdateModalStore>((set) => ({
  isOpen: false,
  trackId: null,
  onOpen: (id) => set({ isOpen: true, trackId: id }),
  onClose: () => set({ isOpen: false, trackId: null }),
}));

export default useUpdateModal;
