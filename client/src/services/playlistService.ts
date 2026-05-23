import type { Playlist, PlaylistDetail } from '@/types';
import { mockPromise } from '@/data/mockUtils';
import {
  addTrackToPlaylistMock,
  createPlaylistMock,
  getPlaylistById,
  getPlaylists,
  removeTrackFromPlaylistMock,
} from '@/data/mockPlaylists';
import api from './api';

// const DEVELOPMENT = true;

// GET    /playlists
export async function getAllPlaylists(): Promise<Playlist[]> {
  // return mockPromise<Playlist[]>(() =>
  //   getPlaylists()
  //     .map((p) => ({ ...p, tracksIds: [...p.tracksIds] }))
  //     .sort((a, b) => a.id - b.id),
  // );
  const { data } = await api.get<Playlist[]>(`/playlists`);
  // console.log('PLAYLISTS', data);
  return data;
}

// GET    /playlists/:id
export async function getPlaylist({
  id,
}: {
  id: number;
}): Promise<PlaylistDetail | null> {
  // return mockPromise<PlaylistDetail | null>(() => getPlaylistById(id));
  const { data } = await api.get<PlaylistDetail | null>(
    `/playlists/${id}/tracks`,
  );
  // console.log('PLAYLIST BY ID', data);
  return data;
}

export async function createPlaylist(formData: FormData) {
  // return createPlaylistMock(formData);
  const { data } = await api.post<Playlist>(`/playlists`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // console.log('Playlist CREATED', data);
  return data;
}

// POST   /playlists/:id/tracks
export async function addTrackToPlaylist({
  playlistId,
  trackId,
}: {
  playlistId: number;
  trackId: number;
}): Promise<Playlist | null> {
  // return mockPromise<PlaylistDetail | null>(() =>
  //   addTrackToPlaylistMock(playlistId, trackId),
  // );
  const { data } = await api.post<Playlist | null>(
    `/playlists/${playlistId}/tracks`,
    {
      id: trackId,
    },
  );
  // console.log('ADD TRACK TO PLAYLIST', data);
  return data;
}

// DELETE /playlists/:id/tracks/:trackId
export async function removeTrackFromPlaylist({
  playlistId,
  trackId,
}: {
  playlistId: number;
  trackId: number;
}): Promise<Playlist | null> {
  // return mockPromise<PlaylistDetail | null>(() =>
  //   removeTrackFromPlaylistMock(playlistId, trackId),
  // );
  const { data } = await api.delete<Playlist | null>(
    `/playlists/${playlistId}/tracks`,
    {
      data: { id: trackId },
    },
  );
  // console.log('REMOVE TRACK FROM PLAYLIST', data);
  return data;
}

export async function updatePlaylist(id: number, formData: FormData) {
  // return createPlaylistMock(formData);
  const { data } = await api.put<Playlist>(`/playlists/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // console.log('Playlist CREATED', data);
  return data;
}

// DELETE PLAYLIST
export async function deletePlaylist({
  playlistId,
}: {
  playlistId: number;
}): Promise<Playlist | null> {
  const { data } = await api.delete<Playlist | null>(
    `/playlists/${playlistId}`,
  );
  // console.log('REMOVE TRACK FROM PLAYLIST', data);
  return data;
}
