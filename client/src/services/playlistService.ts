import type { Playlist, PlaylistDetail } from '@/types';

import api from './api';

// GET    /playlists
export async function getAllPlaylists(search: string): Promise<Playlist[]> {
  const { data } = await api.get<Playlist[]>(`/playlists`, {
    params: { search },
  });
  return data;
}

// GET    /playlists/:id
export async function getPlaylist({
  id,
}: {
  id: number;
}): Promise<PlaylistDetail | null> {
  const { data } = await api.get<PlaylistDetail | null>(
    `/playlists/${id}/tracks`,
  );
  return data;
}

export async function createPlaylist(formData: FormData) {
  const { data } = await api.post<Playlist>(`/playlists`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
  const { data } = await api.post<Playlist | null>(
    `/playlists/${playlistId}/tracks`,
    {
      id: trackId,
    },
  );

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
  const { data } = await api.delete<Playlist | null>(
    `/playlists/${playlistId}/tracks`,
    {
      data: { id: trackId },
    },
  );

  return data;
}

export async function updatePlaylist(id: number, formData: FormData) {
  const { data } = await api.put<Playlist>(`/playlists/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

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

  return data;
}
