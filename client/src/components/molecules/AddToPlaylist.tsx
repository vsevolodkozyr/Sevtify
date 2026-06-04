import useAddToFavorite from '@/hooks/useAddToFavorite';

import type { Playlist } from '@/types';
import LikeButton from './LikeButton';
import { cn } from '@/lib/utils';
import Image from '../atoms/Image';
import { useState } from 'react';

type Props = {
  playlist: Playlist;
  trackId: number;
  handleClick: (id: number) => void;
};

const AddToPlaylist = ({ playlist, trackId, handleClick }: Props) => {
  const { id } = playlist;
  const { isActive } = useAddToFavorite({
    trackId: trackId ?? 0,
    playlistId: `${id}`,
  });

  const [isAction, setAction] = useState(isActive);

  if (!trackId) return null;

  return (
    <div className="flex gap-2 items-center w-full">
      {/* <button>CLOSE</button> */}
      <Image
        className="w-8 h-8 aspect-square rounded-[8px] shrink-0"
        src={playlist.imagePath}
        alt={playlist.title}
      />
      <div className="flex-1 truncate">
        <p className={cn('text-[14px] truncate')}>{playlist.title}</p>
        <p className="text-[12px] text-neutral-400 truncate">
          {isAction !== isActive
            ? isAction
              ? playlist.tracksIds.length + 1
              : playlist.tracksIds.length - 1
            : playlist.tracksIds.length}
          <span>{" "}tracks</span>
        </p>
      </div>
      <LikeButton
        className="shrink-0"
        isActive={isAction}
        onClick={() => {
          handleClick({ id: playlist.id, method: !isActive });
          setAction((old) => !old);
        }}
      />
    </div>
  );
};

export default AddToPlaylist;
