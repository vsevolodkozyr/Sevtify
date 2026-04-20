import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as tracksService from '../services/tracksService';
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
