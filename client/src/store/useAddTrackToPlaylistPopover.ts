// store/useAddTrackToPlaylistPopover.ts
import { create } from 'zustand';

interface Store {
  trackId: number | null;
  setTrackId: (value: number) => void;
}

const useAddTrackToPlaylistPopover = create<Store>((set) => ({
  trackId: null,
  setTrackId: (value) => set({ trackId: value }),
}));

export default useAddTrackToPlaylistPopover;
