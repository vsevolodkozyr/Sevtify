import useAddToFavorite from '@/hooks/useAddToFavorite';
import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import type { Playlist } from '@/types';
import LikeButton from './LikeButton';
import { cn } from '@/lib/utils';

type Props = { playlist: Playlist };

const AddToPlaylist = ({ playlist, ...props }: Props) => {
  const { trackId } = useAddTrackToPlaylistPopover();
  const { isActive, handleClick } = useAddToFavorite({
    trackId: trackId ?? 0,
    playlistId: playlist.id,
  });

  console.log(trackId, playlist, isActive);

  if (!trackId) return null;

  return (
    <div {...props} className="flex gap-2 items-center">
      <img
        className="w-8 h-8 aspect-square rounded-[8px]"
        src={playlist.image_path}
        alt={playlist.title}
      />
      <div className="">
        <p className={cn('text-[14px]')}>{playlist.title}</p>
        <p className="text-[12px] text-neutral-400">
          {playlist.tracksIds.length} tracks
        </p>
      </div>
      <LikeButton isActive={isActive} onClick={handleClick} />
    </div>
  );
};

export default AddToPlaylist;
