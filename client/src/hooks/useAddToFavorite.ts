import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import { useTrackPlaylistStatus } from './useTracks';
import { useAddToPlaylist, useRemoveFromPlaylist } from './usePlaylists';

type Props = { trackId: number | null; playlistId?: number };
const useAddToFavorite = ({ trackId, playlistId }: Props) => {
  const { data: playlistStatus = [] } = useTrackPlaylistStatus(trackId);
  const { toggle } = useAddTrackToPlaylistPopover();
  const { mutateAsync: addToPlaylist } = useAddToPlaylist();
  const { mutateAsync: removeFromPlaylist } = useRemoveFromPlaylist();

  const isInAnyPlaylist = playlistStatus.some((p) => p.isAdded);
  const isInCurrentPlaylist = playlistId
    ? (playlistStatus.find((p) => p.id === playlistId)?.isAdded ?? false)
    : false;
  const isActive = playlistId ? isInCurrentPlaylist : isInAnyPlaylist;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!trackId) return;
    if (playlistId) {
      if (isInCurrentPlaylist) {
        removeFromPlaylist({ trackId, playlistId });
      } else {
        addToPlaylist({ trackId, playlistId });
      }
    } else {
      if (isInAnyPlaylist) {
        toggle(trackId);
      } else {
        addToPlaylist({ trackId, playlistId: 1 });
      }
    }
  };

  return { isActive, handleClick };
};

export default useAddToFavorite;
