import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import { useTrackPlaylistStatus } from './useTracks';
import { useAddToPlaylist, useRemoveFromPlaylist } from './usePlaylists';
import toast from 'react-hot-toast';

type Props = { trackId: number | null; playlistId?: string | number };
const useAddToFavorite = ({ trackId, playlistId }: Props) => {
  const numericPlaylistId = playlistId != null ? Number(playlistId) : null;
  const { setTrackId } = useAddTrackToPlaylistPopover();
  const { mutateAsync: addToPlaylist } = useAddToPlaylist();
  const { mutateAsync: removeFromPlaylist } = useRemoveFromPlaylist();
  const { data: playlistStatus = [], error } = useTrackPlaylistStatus(trackId);
  if (error || !playlistStatus) {
    return { isActive: null, handleClick: () => {toast.error("Помилка отримання даних")} };
  }
  

  const isInAnyPlaylist = playlistStatus.some((p) => p.isAdded);
  const isInCurrentPlaylist =
    numericPlaylistId != null
      ? (playlistStatus.find((p) => p.id === numericPlaylistId)?.isAdded ??
        false)
      : false;

  const isActive =
    numericPlaylistId != null ? isInCurrentPlaylist : isInAnyPlaylist;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!trackId) return;
    if (numericPlaylistId != null) {
      if (isInCurrentPlaylist) {
        removeFromPlaylist({ trackId, playlistId });
      } else {
        addToPlaylist({ trackId, playlistId });
      }
    } else {
      if (isInAnyPlaylist) {
        setTrackId(trackId);
      } else {
        addToPlaylist({ trackId, playlistId: 0 });
      }
    }
  };

  return { isActive, handleClick };
};

export default useAddToFavorite;
