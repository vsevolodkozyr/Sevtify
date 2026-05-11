import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as tracksService from '../services/tracksService';
import * as playlistService from '../services/playlistService';
import { trackKeys } from '@/services/queryKeys';

export const useTracks = () => {
  return useQuery({
    queryKey: trackKeys.all,
    queryFn: () => tracksService.getAllTracks(),
  });
};

// POST — додати трек
export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tracksService.addTrack,
    onSuccess: () => {
      // інвалідуємо весь список треків → автоматичний refetch
      queryClient.invalidateQueries({ queryKey: trackKeys.all });
    },
  });
};

// NOT ON PRODUCTION
// hooks/useTrackPlaylists.ts
import { playlistKeys } from '@/services/queryKeys';
export const useTrackPlaylists = (trackId: number) => {
  const { data: trackPlaylists = [] } = useQuery({
    queryKey: [...playlistKeys.all, 'byTrack', trackId], // ← додати trackId
    queryFn: () => playlistService.getAllPlaylists(),
    select: (playlists) =>
      playlists.filter((p) => p.tracksIds.includes(trackId)),
  });

  return { trackPlaylists };
};
