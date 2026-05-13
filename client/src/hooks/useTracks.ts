import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as tracksService from '../services/tracksService';
import { trackKeys } from '@/services/queryKeys';

// GET    /tracks
export const useTracks = () => {
  return useQuery({
    queryKey: trackKeys.all,
    queryFn: () => tracksService.getAllTracks(),
  });
};

// GET    /tracks/:id
export const useTrackById = (id: number) => {
  return useQuery({
    queryKey: trackKeys.detail(id),
    queryFn: () => tracksService.getTrackById(id),
    enabled: !!id,
  });
};

// POST   /tracks
export const useAddTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => tracksService.addTrack(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trackKeys.all });
    },
  });
};

// DELETE /tracks/:id
export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => tracksService.deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trackKeys.all });
    },
  });
};

// GET    /tracks/:id/playlist-status
export const useTrackPlaylistStatus = (id: number) => {
  return useQuery({
    queryKey: trackKeys.playlistStatus(id),
    queryFn: () => tracksService.getTrackPlaylistStatus(id),
    enabled: !!id,
  });
};
