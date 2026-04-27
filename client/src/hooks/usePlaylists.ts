import { playlistKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';
import * as playlistService from '../services/playlistService';

export const usePlaylists = () => {
  return useQuery({
    queryKey: playlistKeys.all,
    queryFn: () => playlistService.getAllPlaylists(),
  });
};
