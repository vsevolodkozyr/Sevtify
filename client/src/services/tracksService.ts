import type { Track } from '@/types';
import api from './api';
import { insertTrack, mockPromise, tracks } from '@/data/mockTracks';

const DEVELOPMENT = import.meta.env.DEVELOPMENT || true;

export const getAllTracks = async (params = {}) => {
  if (DEVELOPMENT) {
    return mockPromise(() => tracks);
  }
  const { data } = await api.get<Track[]>('/tracks', { params });
  return data;
};

export const addTrack = async (formData: FormData): Promise<Track> => {
  if (DEVELOPMENT) {
    return mockPromise(async () => await insertTrack(formData));
  }
  const { data } = await api.post('/tracks', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
