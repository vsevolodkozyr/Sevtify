import { playlistKeys } from '@/services/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    queryFn: () => playlistService.getPlaylist({ id }),
  });
};

export const useAddToPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      trackId,
      playlistId,
    }: {
      trackId: number;
      playlistId: number;
    }) => playlistService.addTrackToPlaylist(trackId, playlistId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
      queryClient.invalidateQueries({
        queryKey: playlistKeys.detail(playlistId),
      });
    },
  });
};

export const useRemoveFromPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      trackId,
      playlistId,
    }: {
      trackId: number;
      playlistId: number;
    }) => playlistService.removeTrackFromPlaylist(trackId, playlistId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
      queryClient.invalidateQueries({
        queryKey: playlistKeys.detail(playlistId),
      });
    },
  });
};
