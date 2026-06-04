import { useQueryClient } from '@tanstack/react-query';
import * as playlistService from '../services/playlistService';
import { trackKeys } from '@/services/queryKeys';
import { useAddToPlaylist, useRemoveFromPlaylist } from './usePlaylists';
type PlaylistChange = { id: number; method: boolean };
export const useSavePlaylists = (
  trackId: number | null,
  playlists: PlaylistChange[],
) => {
  const { mutateAsync: addTrack } = useAddToPlaylist();
  const { mutateAsync: removeTrack } = useRemoveFromPlaylist();
  const handleSave = async () => {
    if (!trackId || playlists.length === 0) return;

    for (const { id, method } of playlists) {
      try {
        if (method) {
          await addTrack({ trackId, playlistId: id });
        } else {
          await removeTrack({ trackId, playlistId: id });
        }
      } catch (error) {
        console.error(`Помилка для плейлиста ${id}`);
      }
    }
  };

  return { handleSave };
};
