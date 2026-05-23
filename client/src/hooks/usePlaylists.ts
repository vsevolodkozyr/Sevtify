import { playlistKeys, trackKeys } from '@/services/queryKeys';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import * as playlistService from '../services/playlistService';
import { mockPromise } from '@/data/mockUtils';

// GET    /playlists
export function usePlaylists() {
  return useQuery({
    queryKey: playlistKeys.all,
    queryFn: () => playlistService.getAllPlaylists(),
  });
}

export const useAddPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      playlistService.createPlaylist(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
    },
  });
};

// GET    /playlists/:id
export function usePlaylist({ id }: { id: number }) {
  return useQuery({
    queryKey: playlistKeys.detail(id),
    queryFn: () => playlistService.getPlaylist({ id }),
    enabled: id !== null,
    retry: 0,
  });
}

// POST   /playlists/:id/tracks
export function useAddToPlaylist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      playlistId,
      trackId,
    }: {
      playlistId: number;
      trackId: number;
    }) => playlistService.addTrackToPlaylist({ playlistId, trackId }),
    onSuccess: (_, { playlistId, trackId }) => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
      queryClient.invalidateQueries({
        queryKey: playlistKeys.detail(playlistId),
      });
      queryClient.invalidateQueries({
        queryKey: trackKeys.playlistStatus(trackId),
      });
    },
  });
}

// DELETE /playlists/:id/tracks/:trackId
export function useRemoveFromPlaylist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      playlistId,
      trackId,
    }: {
      playlistId: number;
      trackId: number;
    }) => playlistService.removeTrackFromPlaylist({ playlistId, trackId }),
    onSuccess: (_, { playlistId, trackId }) => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
      queryClient.invalidateQueries({
        queryKey: playlistKeys.detail(playlistId),
      });
      queryClient.invalidateQueries({
        queryKey: trackKeys.playlistStatus(trackId),
      });
    },
  });
}

// UPDATE
export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      playlistService.updatePlaylist(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
    },
  });
};

// DELETE /playlists/:id
export function useDeletePlaylist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      playlistService.deletePlaylist({ playlistId }),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
      queryClient.invalidateQueries({
        queryKey: playlistKeys.detail(playlistId),
      });
      queryClient.invalidateQueries({
        queryKey: trackKeys.all,
      });
    },
  });
}
