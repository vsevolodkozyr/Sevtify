import { useQueryClient } from '@tanstack/react-query';
import * as playlistService from '../services/playlistService';
import { trackKeys } from '@/services/queryKeys';
type PlaylistChange = { id: number; method: boolean };
export const useSavePlaylists = (
  trackId: number | null,
  playlists: PlaylistChange[],
) => {
  const queryClient = useQueryClient();

  const handleSave = async () => {
    if (!trackId || playlists.length === 0) return;

    for (const { id, method } of playlists) {
      if (method) {
        await playlistService.addTrackToPlaylist({ trackId, playlistId: id });
      } else {
        await playlistService.removeTrackFromPlaylist({
          trackId,
          playlistId: id,
        });
      }
    }

    queryClient.invalidateQueries({ queryKey: ['playlists'] });
    queryClient.invalidateQueries({
      queryKey: trackKeys.playlistStatus(trackId),
    });
  };

  return { handleSave };
};
