import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import * as tracksService from '../services/tracksService';
import { playlistKeys, trackKeys } from '@/services/queryKeys';
import usePlayer from '@/store/usePlayer';

// GET    /tracks
export const useTracks = (searchQuery: string) => {
  return useQuery({
    queryKey: [...trackKeys.all, { search: searchQuery }],
    queryFn: () => tracksService.getAllTracks(searchQuery),
  });
};

// GET    /tracks/:id
export const useTrackById = (id: number) => {
  return useQuery({
    queryKey: trackKeys.detail(id),
    queryFn: () => tracksService.getTrackById(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
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
// UPDATE   /tracks
export const useUpdateTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      tracksService.updateTrack(id, formData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: trackKeys.all });
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });

      queryClient.invalidateQueries({ queryKey: trackKeys.detail(id) });
    },
  });
};

// DELETE /tracks/:id
export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  const currentTrackId = usePlayer((state) => state.currentTrackId);
  const clearTrack = usePlayer((state) => state.setTrackId); // or setTrackId(null)
  return useMutation({
    mutationFn: (id: number) => tracksService.deleteTrack(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: trackKeys.all });
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });
      queryClient.removeQueries({ queryKey: trackKeys.detail(id) });
      queryClient.removeQueries({ queryKey: trackKeys.playlistStatus(id) });

      if (currentTrackId === id) {
        clearTrack(null);
      }
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
