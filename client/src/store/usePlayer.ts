import type { Track } from '@/types';
import { create } from 'zustand';
import { Howl } from 'howler';

interface PlayerStore {
  player: Howl | null;
  currentTrackId: number | null;
  currentTrackUrl: string | null;
  currentPlaylist: Track[] | null;
  pause: boolean;
  volume: number;
  duration: number;
  time: number;
  playingContext: string | number | null;

  setPlayer: (player: Howl | null) => void;
  setTrackId: (id: number | null) => void;
  setTrackUrl: (track: string | null) => void;
  setPause: (pause: boolean) => void;
  playNext: () => void;
  playPrev: () => void;
  setVolume: (volume: number) => void;
  onPlayPause: () => void;
  setTime: (time: number) => void;
  setDuration: (duration: number) => void;
  onChangeTime: (time: number) => void;
  onMute: () => void;
  onUnmute: () => void;
  setPlaylist: (playlist: Track[] | null, context?: string | number) => void;
  addTrack: (track: Track, context?: string | number) => void;
  removeTrack: (id: number, context?: string | number) => void;
}
const usePlayer = create<PlayerStore>((set, get) => ({
  currentTrackUrl: null,
  currentPlaylist: null,
  pause: true,
  currentTrackId: null,
  player: null,
  volume: 0.5,
  duration: 0,
  time: 0,
  playingContext: null,
  onMute: () => {
    const player = get().player;
    if (player) player.mute(true);
  },

  onUnmute: () => {
    const player = get().player;
    if (player) player.mute(false);
  },

  onChangeTime: (time: number) => {
    const player = get().player;
    if (player) {
      player.seek(time);
      set({ time });
    }
  },

  setVolume: (volume: number) => {
    if (volume < 0 || typeof volume !== 'number') return;

    const player = get().player;

    if (player) player.volume(volume);

    set({ volume });
  },

  onPlayPause: () => {
    const player = get().player;

    if (!player) return;

    if (player.playing()) {
      player.pause();
      set({ pause: true });
    } else {
      player.play();
      set({ pause: false });
    }
  },

  setTime: (time: number) => set({ time }),
  setDuration: (duration: number) => set({ duration }),
  setPlayer: (player: Howl | null) => set({ player }),
  setTrackUrl: (track: string | null) => set({ currentTrackUrl: track }),
  setPlaylist: (playlist: Track[] | null, context?: string | number) =>
    set({
      currentPlaylist: playlist,
      playingContext: context || null,
    }),
  setPause: (pause: boolean) => set({ pause }),

  setTrackId: (id: number | null) =>
    set((state) => {
      if (!state.currentPlaylist) return state;
      const track = state.currentPlaylist.find((t) => t.id === id);
      if (track) {
        return {
          currentTrackId: id,
          currentTrackUrl: track.trackPath,
        };
      }
      return {
        currentTrackId: null,
        currentTrackUrl: null,
      };
    }),

  playNext: () => {
    set((state) => {
      if (!state.currentPlaylist || state.currentTrackId === null) return state;
      const currentIndex = state.currentPlaylist.findIndex(
        (t) => t.id === state.currentTrackId,
      );
      const length = state.currentPlaylist.length;

      if (length === 1 && state.player) {
        state.player?.seek(0);
        state.player?.play();
        return { time: 0 };
      }
      const nextIndex = (currentIndex + 1) % length;
      const nextTrack = state.currentPlaylist[nextIndex];
      return {
        currentTrackId: nextTrack.id,
        currentTrackUrl: nextTrack.trackPath,
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
      if (length === 1 && state.player) {
        state.player?.seek(0);
        state.player?.play();
        return { time: 0 };
      }
      const prevIndex = (currentIndex - 1 + length) % length;
      const prevTrack = state.currentPlaylist[prevIndex];
      return {
        currentTrackId: prevTrack.id,
        currentTrackUrl: prevTrack.trackPath,
      };
    });
  },

  addTrack: (track: Track, context?: string | number) => {
    const state = get();
    if (context && state.playingContext !== context) return;

    if (!state.currentPlaylist) return;
    const isAlreadyInPlaylist = state.currentPlaylist.some(
      (t) => t.id === track.id,
    );
    if (isAlreadyInPlaylist) return;

    set({
      currentPlaylist: [...state.currentPlaylist, track],
    });
  },

  removeTrack: (idToRemove: number, context?: string | number) => {
    const state = get();

    if (!state.currentPlaylist) return;

    const newPlaylist = state.currentPlaylist.filter(
      (t) => t.id !== idToRemove,
    );

    if (newPlaylist.length === 0) {
      if (state.player) state.player.stop();
      set({
        currentPlaylist: null,
        currentTrackId: null,
        currentTrackUrl: null,
        pause: true,
      });
      return;
    }

    if (state.currentTrackId === idToRemove) {
      const currentIndex = state.currentPlaylist.findIndex(
        (t) => t.id === idToRemove,
      );
      const nextTrack = newPlaylist[currentIndex % newPlaylist.length];

      set({
        currentPlaylist: newPlaylist,
        currentTrackId: nextTrack.id,
        currentTrackUrl: nextTrack.trackPath,
      });
    } else {
      set({ currentPlaylist: newPlaylist });
    }
  },
}));

export default usePlayer;
