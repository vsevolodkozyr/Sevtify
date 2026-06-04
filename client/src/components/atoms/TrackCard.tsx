import type { Track } from '@/types';
import { Button } from './Button';
import { FaPause, FaPlay } from 'react-icons/fa';
import useAddToFavorite from '@/hooks/useAddToFavorite';
import LikeButton from '../molecules/LikeButton';
import usePlayer from '@/store/usePlayer';
import { useMemo } from 'react';
import Image from './Image';
import AddTrackToPlaylistPopover from '../organisms/AddTrackToPlaylistPopover';
import TrackParamsPopover from '../organisms/TrackParamsPopover';
import { IoIosMore } from 'react-icons/io';

type Props = {
  data: Track;
  tracks: Track[];
};

const TrackCard = ({ data, tracks }: Props) => {
  const { title, author, imagePath, id } = data;
  const { isActive, handleClick } = useAddToFavorite({ trackId: id });
  const setTrackId = usePlayer((state) => state.setTrackId);
  const setPlaylist = usePlayer((state) => state.setPlaylist);

  const trackId = usePlayer((state) => state.currentTrackId);
  const onPlayPause = usePlayer((state) => state.onPlayPause);
  const isPaused = usePlayer((state) => state.pause);

  const Icon = useMemo(() => {
    if (id !== trackId) {
      return FaPlay;
    } else {
      return isPaused ? FaPlay : FaPause;
    }
  }, [trackId, isPaused]);

  return (
    <div className="@container group w-full flex flex-col gap-2 p-3 bg-neutral-800 rounded-[8px] overflow-hidden">
      <div className="w-full aspect-square overflow-hidden relative">
        <Image
          className={`
            size-full
            rounded-[8px]
            object-cover
            `}
          src={imagePath || '/'}
          onError={(e) => {
            e.target.attributes.src.value = '/fallback/track.jfif';
          }}
          alt={`Track ${title} - ${author}`}
        />
        <Button
          onClick={() => {
            if (id !== trackId) {
              setPlaylist(tracks, 'all_tracks');
              setTrackId(id);
            } else {
              onPlayPause();
            }
          }}
          variant={'icon'}
          size={'icon'}
          className={`
            absolute bottom-1 right-1 text-[7cqw] text-black bg-primary p-3 
            sm:translate-y-1/2 sm:opacity-0 
            group-hover:translate-y-0 group-hover:opacity-100 
            group-focus-within:translate-y-0 group-focus-within:opacity-100 
            focus-visible:ring-white
          `}
        >
          <Icon />
        </Button>
        <AddTrackToPlaylistPopover isActive={isActive}>
          <LikeButton
            className={`
              absolute top-2 right-2 
              sm:opacity-0 group-hover:opacity-100 
              group-focus-within:opacity-100 transition-opacity
              focus-visible:opacity-100 rounded-full
              focus-visible:ring-white
            `}
            isActive={isActive}
            onClick={handleClick}
          />
        </AddTrackToPlaylistPopover>
        <TrackParamsPopover trackId={id}>
          <Button
            variant={'icon'}
            size={'icon'}
            className={`
              absolute hit-area-[10px] top-2 left-2 
              sm:opacity-0 group-hover:opacity-100 
              group-focus-within:opacity-100 transition-opacity
              focus-visible:opacity-100 rounded-full
            `}
          >
            <IoIosMore />
          </Button>
        </TrackParamsPopover>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[18px] font-medium truncate">{title}</p>
        <p className="text-[16px] text-neutral-400 leading-normal truncate">
          {author}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
