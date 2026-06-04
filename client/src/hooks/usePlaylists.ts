import { playlistKeys, trackKeys } from '@/services/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as playlistService from '../services/playlistService';
import toast from 'react-hot-toast';

// GET    /playlists
export function usePlaylists(search: string) {
  return useQuery({
    queryKey: [...playlistKeys.all, { search: search }],
    queryFn: () => playlistService.getAllPlaylists(search),
    retry: 0,
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
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Не вдалося створити трек.';
      toast.error(errorMessage);
    },
    retry: 0,
  });
};

// GET    /playlists/:id
export function usePlaylist({ id }: { id: number | undefined }) {
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
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Не вдалося додати трек до плейлисту.';
      toast.error(errorMessage);
    },
    retry: 0,
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
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        'Не вдалося видалити трек з плейлисту.';
      toast.error(errorMessage);
    },
    retry: 0,
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
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Не вдалося оновити плейлист.';
      toast.error(errorMessage);
    },
    retry: 0,
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
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Не вдалося видалити плейлист.';
      toast.error(errorMessage);
    },
    retry: 0,
  });
}
