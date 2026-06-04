import { create } from 'zustand';

interface UpdateModalStore {
  isOpen: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
  playlistId: number | null;
}

const useUpdatePlaylistModal = create<UpdateModalStore>((set) => ({
  isOpen: false,
  playlistId: null,
  onOpen: (id) => set({ isOpen: true, playlistId: id }),
  onClose: () => set({ isOpen: false, playlistId: null }),
}));

export default useUpdatePlaylistModal;
