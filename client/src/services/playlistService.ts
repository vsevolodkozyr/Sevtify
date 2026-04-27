import type { Playlist } from '@/types';
import api from './api';
import { mockPromise } from '@/data/mockTracks';
import { seed } from '@/data/mockPlaylists';
const DEVELOPMENT = true;

export const getAllPlaylists = async (params = {}) => {
  if (DEVELOPMENT) {
    return mockPromise(() => seed(32));
  }
  const { data } = await api.get<Playlist[]>('/tracks', { params });
  return data;
};

// export const addTrack = async (formData: FormData): Promise<Track> => {
//   if (DEVELOPMENT) {
//     return mockPromise(() => insertTrack(formData));
//   }
//   const { data } = await api.post('/tracks', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return data;
// };
