import { playlistKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';
import * as playlistService from '../services/playlistService';

export const usePlaylists = () => {
  return useQuery({
    queryKey: playlistKeys.all,
    queryFn: () => playlistService.getAllPlaylists(),
  });
};
export const usePlaylist = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: playlistKeys.detail(id),
    queryFn: () => playlistService.getPlaylist(),
  });
};
