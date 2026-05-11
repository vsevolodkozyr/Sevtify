import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import {
  useAddToPlaylist,
  usePlaylist,
  useRemoveFromPlaylist,
} from './usePlaylists';
import { useTrackPlaylists } from './useTracks';

type Props = { trackId: number; playlistId?: number };

const useAddToFavorite = ({ trackId, playlistId }: Props) => {
  // console.log(trackId, playlistId);

  const { trackPlaylists } = useTrackPlaylists(trackId);
  // console.log(trackPlaylists);

  const { data: currentPlaylist } = usePlaylist({ id: playlistId ?? 0 });
  const { toggle } = useAddTrackToPlaylistPopover();
  const { mutateAsync: addToPlaylist } = useAddToPlaylist();
  const { mutateAsync: removeFromPlaylist } = useRemoveFromPlaylist();
  const isInAnyPlaylist = trackPlaylists.length > 0;
  const isInCurrentPlaylist = playlistId
    ? currentPlaylist?.tracks.some((track) => track.id === trackId)
    : false;
  const isActive = playlistId ? isInCurrentPlaylist : isInAnyPlaylist;
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (playlistId) {
      // ── Режим плейлиста ──────────────────────────────

      if (isInCurrentPlaylist) {
        await removeFromPlaylist({ trackId, playlistId });
        console.log(trackPlaylists);
      } else {
        await addToPlaylist({ trackId, playlistId });
      }
    } else {
      // ── Режим бібліотеки ─────────────────────────────
      if (!isInAnyPlaylist) {
        await addToPlaylist({ trackId, playlistId: 1 }); // 1 = Favorites ID
      } else {
        toggle(trackId); // відкрити popover
      }
    }
  };

  return { isActive, handleClick };
};

export default useAddToFavorite;
