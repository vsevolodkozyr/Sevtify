import type { Playlist, PlaylistDetail } from '@/types';
import { mockPromise } from '@/data/mockUtils';
import {
  addTrackToPlaylistMock,
  getPlaylistById,
  getPlaylists,
  removeTrackFromPlaylistMock,
} from '@/data/mockPlaylists';

// const DEVELOPMENT = true;

// GET    /playlists
export function getAllPlaylists(): Promise<Playlist[]> {
  return mockPromise<Playlist[]>(() =>
    getPlaylists()
      .map((p) => ({ ...p, tracksIds: [...p.tracksIds] }))
      .sort((a, b) => a.id - b.id),
  );
}

// GET    /playlists/:id
export function getPlaylist({
  id,
}: {
  id: number;
}): Promise<PlaylistDetail | null> {
  return mockPromise<PlaylistDetail | null>(() => getPlaylistById(id));
}

// POST   /playlists/:id/tracks
export function addTrackToPlaylist({
  playlistId,
  trackId,
}: {
  playlistId: number;
  trackId: number;
}): Promise<PlaylistDetail | null> {
  return mockPromise<PlaylistDetail | null>(() =>
    addTrackToPlaylistMock(playlistId, trackId),
  );
}

// DELETE /playlists/:id/tracks/:trackId
export function removeTrackFromPlaylist({
  playlistId,
  trackId,
}: {
  playlistId: number;
  trackId: number;
}): Promise<PlaylistDetail | null> {
  return mockPromise<PlaylistDetail | null>(() =>
    removeTrackFromPlaylistMock(playlistId, trackId),
  );
}
