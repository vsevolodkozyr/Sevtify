import type { Playlist, PlaylistDetail } from '@/types';
import api from './api';
import { mockPromise } from '@/data/mockTracks';
import {
  addToPlaylist,
  getPlaylists,
  getPlaylistsTracks,
  removeFromPlaylist,
} from '@/data/mockPlaylists';
const DEVELOPMENT = true;

export const getAllPlaylists = async (params = {}) => {
  if (DEVELOPMENT) {
    return mockPromise(() => [...getPlaylists()]);
  }
  const { data } = await api.get<Playlist[]>('/tracks', { params });
  return data;
};

export const getPlaylist = async (
  params = {},
): Promise<PlaylistDetail | null> => {
  return mockPromise(() => getPlaylistsTracks(params));

  //   const { data } = await api.get<PlaylistDetail[]>('/tracks', { params });
  //   return data;
};

export const addTrackToPlaylist = async (
  trackId: number,
  playlistId: number,
): Promise<Playlist | null> => {
  if (DEVELOPMENT) {
    return mockPromise(() => addToPlaylist(trackId, playlistId));
  }
  const { data } = await api.post(
    '/tracks',
    { trackId, playlistId },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return data;
};
export const removeTrackFromPlaylist = async (
  trackId: number,
  playlistId: number,
): Promise<Playlist | null> => {
  if (DEVELOPMENT) {
    return mockPromise(() => removeFromPlaylist(trackId, playlistId));
  }
  const { data } = await api.post(
    '/tracks',
    { trackId, playlistId },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return data;
};
