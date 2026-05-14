import { create } from 'zustand';

interface NowPlayingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNowPlayingModal = create<NowPlayingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNowPlayingModal;
