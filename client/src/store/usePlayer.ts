import type { Track } from '@/types';
import { create } from 'zustand';

interface PlayerStore {
  player: Howl | null;
  currentTrackId: number | null;
  currentTrackUrl: string | null;
  currentPlaylist: Track[] | null;
  pause: boolean;
  volume: number;
  setPlayer: (player: Howl | null) => void;
  setTrackId: (id: number | null) => void;
  setTrackUrl: (track: string | null) => void;
  setPlaylist: (playlist: Track[] | null) => void;
  setPause: (pause: boolean) => void;
  playNext: () => void;
  playPrev: () => void;
  setVolume: (volume: number) => void;
  onPlayPause: () => void;
  duration: number;
  time: number;
  setTime: (time: number) => void;
  setDuration: (duration: number) => void;
  onChangeTime: (time: number) => void;
  onMute: () => void;
  onUnmute: () => void;
  isChangingTime: boolean;
}

const usePlayer = create<PlayerStore>((set) => ({
  currentTrackUrl: null,
  currentPlaylist: null,
  pause: true,
  currentTrackId: null,
  player: null,
  volume: 0.5,
  duration: 0,
  time: 0,
  isChangingTime: false,
  onMute: () =>
    set((state) => {
      if (state.player) {
        state.player.mute(true);
        return state;
      }
      return state;
    }),
  onUnmute: () =>
    set((state) => {
      if (state.player) {
        state.player.mute(false);
        return state;
      }
      return state;
    }),

  onChangeTime: (time: number) =>
    set((state) => {
      if (state.player) {
        state.player.seek(time);
        return { ...state, time, isChangingTime: true };
      }
      return state;
    }),
  setTime: (time: number) => set({ time }),
  setDuration: (duration: number) => set({ duration }),
  setPlayer: (player: Howl | null) => set({ player }),
  setTrackId: (id: number | null) =>
    set((state) => {
      if (!state.currentPlaylist) return state;
      const track = state.currentPlaylist.find((t) => t.id === id);
      if (track) {
        return {
          ...state,
          currentTrackId: id,
          currentTrackUrl: track.track_path,
        };
      }
      return {
        ...state,
        currentTrackId: null,
        currentTrackUrl: null,
      };
    }),
  setTrackUrl: (track: string | null) => set({ currentTrackUrl: track }),
  setPlaylist: (playlist: Track[] | null) => set({ currentPlaylist: playlist }),
  setPause: (pause: boolean) => set({ pause }),
  playNext: () => {
    set((state) => {
      console.log(state.currentPlaylist, state.currentTrackId);

      if (!state.currentPlaylist || state.currentTrackId === null) return state;
      const currentIndex = state.currentPlaylist.findIndex(
        (t) => t.id === state.currentTrackId,
      );
      const length = state.currentPlaylist.length;
      const nextIndex = (currentIndex + 1) % length;
      const nextTrack = state.currentPlaylist[nextIndex];
      return {
        ...state,
        currentTrackId: nextTrack.id,
        currentTrackUrl: nextTrack.track_path,
      };
    });
  },
  playPrev: () => {
    set((state) => {
      if (!state.currentPlaylist || state.currentTrackId === null) return state;
      const currentIndex = state.currentPlaylist.findIndex(
        (t) => t.id === state.currentTrackId,
      );
      const length = state.currentPlaylist.length;
      const prevIndex = (currentIndex - 1 + length) % length;
      const prevTrack = state.currentPlaylist[prevIndex];
      return {
        ...state,
        currentTrackId: prevTrack.id,
        currentTrackUrl: prevTrack.track_path,
      };
    });
  },
  setVolume: (volume: number) =>
    set((state) => {
      if (volume < 0 || typeof volume !== 'number') {
        return state;
      }
      state.player?.volume(volume);
      return { ...state, volume };
    }),
  onPlayPause: () =>
    set((state) => {
      if (!state.player) return state;
      if (state.player.playing()) {
        state.player.pause();
        return { ...state, pause: true };
      } else {
        state.player.play();
        return { ...state, pause: false };
      }
    }),
}));

export default usePlayer;
