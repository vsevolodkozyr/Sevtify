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

const DEVELOPMENT = import.meta.env.VITE_DEVELOPMENT == 'true';
// console.log('DEVELOPMENT', DEVELOPMENT);

// GET    /tracks
export const getAllTracks = async (searchQuery) => {
  // if (DEVELOPMENT) {
  //   return mockPromise(() => getTracksMock());
  // }
  const { data } = await api.get<Track[]>('/tracks', {
    params: searchQuery,
  });
  // console.log('ALL TRACKS', data);
  return data;
};

// GET    /tracks/:id
export const getTrackById = async (id: number) => {
  // if (DEVELOPMENT) {
  //   return mockPromise(() => getTrackByIdMock(id));
  // }
  const { data } = await api.get<Track>(`/tracks/${id}`);
  // console.log('TRACK BY ID', data);
  return data;
};

// POST   /tracks

export const addTrack = async (formData: FormData) => {
  // if (DEVELOPMENT) {
  //   return insertTrackMock(formData);
  // }
  const { data } = await api.post<Track>(`/tracks`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // console.log('TRACK CREATED', data);
  return data;
};

// DELETE /tracks/:id || IN PROGRESS
export const deleteTrack = async (id: number) => {
  // if (DEVELOPMENT) {
  //   return mockPromise(() => deleteTrackMock(id));
  // }
  const { data } = await api.delete<Track>(`/tracks/${id}`);
  return data;
};

// PUT UPDATE TRACK
export const updateTrack = async (id: number, formData: FormData) => {
  // if (DEVELOPMENT) {
  //   return insertTrackMock(formData);
  // }
  const { data } = await api.put<Track>(`/tracks/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // console.log('TRACK CREATED', data);
  return data;
};

// GET    /tracks/:id/playlist-status
export const getTrackPlaylistStatus = async (id: number) => {
  // if (DEVELOPMENT) {
  //   return mockPromise(() => playlistsStatusByTrackIdMock(id));
  // }
  const { data } = await api.get<Track>(`playlists/has/track/${id}`);
  // console.log('TRACK PLAYLISTS STATUS', data);
  return data;
};
