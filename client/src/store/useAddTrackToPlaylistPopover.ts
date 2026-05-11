// store/useAddTrackToPlaylistPopover.ts
import { create } from 'zustand';

interface Store {
  trackId: number | null;
  isOpen: boolean;
  onOpen: (trackId: number) => void;
  onClose: () => void;
  toggle: (trackId: number) => void;
}

const useAddTrackToPlaylistPopover = create<Store>((set, get) => ({
  trackId: null,
  isOpen: false,

  onOpen: (trackId) => set({ isOpen: true, trackId }),
  onClose: () => set({ isOpen: false, trackId: null }),

  // Якщо той самий трек — закрити, інший — відкрити з новим id
  toggle: (trackId) => {
    const { isOpen, trackId: currentId } = get();
    if (isOpen && currentId === trackId) {
      set({ isOpen: false, trackId: null });
    } else {
      set({ isOpen: true, trackId });
    }
  },
}));

export default useAddTrackToPlaylistPopover;
