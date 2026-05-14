import type { Track } from '@/types';
import api from './api';
import {
  deleteTrackMock,
  getTrackByIdMock,
  getTracksMock,
  insertTrackMock,
  playlistsStatusByTrackIdMock,
} from '@/data/mockTracks';
import { mockPromise } from '@/data/mockUtils';

const DEVELOPMENT = import.meta.env.DEVELOPMENT || true;
// GET    /tracks
export const getAllTracks = async (params = {}) => {
  if (DEVELOPMENT) {
    return mockPromise(() => getTracksMock());
  }
  const { data } = await api.get<Track[]>('/tracks', { params });
  return data;
};

// GET    /tracks/:id
export const getTrackById = async (id: number) => {
  if (DEVELOPMENT) {
    return mockPromise(() => getTrackByIdMock(id));
  }
};

// POST   /tracks
export const addTrack = async (formData: FormData) => {
  if (DEVELOPMENT) {
    return insertTrackMock(formData);
  }
};

// DELETE /tracks/:id
export const deleteTrack = async (id: number) => {
  if (DEVELOPMENT) {
    return mockPromise(() => deleteTrackMock(id));
  }
};

// GET    /tracks/:id/playlist-status
export const getTrackPlaylistStatus = async (id: number) => {
  if (DEVELOPMENT) {
    return mockPromise(() => playlistsStatusByTrackIdMock(id));
  }
};
