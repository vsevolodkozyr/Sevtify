import type { Track } from '@/types';
import api from './api';

// GET    /tracks
export const getAllTracks = async (searchQuery) => {
  const { data } = await api.get<Track[]>('/tracks', {
    params: searchQuery,
  });
  return data;
};

// GET    /tracks/:id
export const getTrackById = async (id: number) => {
  const { data } = await api.get<Track>(`/tracks/${id}`);
  return data;
};

// POST   /tracks
export const addTrack = async (formData: FormData) => {
  const { data } = await api.post<Track>(`/tracks`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// DELETE /tracks/:id || IN PROGRESS
export const deleteTrack = async (id: number) => {
  const { data } = await api.delete<Track>(`/tracks/${id}`);
  return data;
};

// PUT UPDATE TRACK
export const updateTrack = async (id: number, formData: FormData) => {
  const { data } = await api.put<Track>(`/tracks/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// GET    /tracks/:id/playlist-status
export const getTrackPlaylistStatus = async (id: number) => {
  const { data } = await api.get<Track>(`playlists/has/track/${id}`);
  return data;
};
