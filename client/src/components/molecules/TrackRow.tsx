import type { Track } from '@/types';

import { IoIosMore } from 'react-icons/io';

import LikeButton from './LikeButton';
import { FaPause, FaPlay } from 'react-icons/fa';
import useAddToFavorite from '@/hooks/useAddToFavorite';
import usePlayer from '@/store/usePlayer';
import Image from '../atoms/Image';
import AddTrackToPlaylistPopover from '../organisms/AddTrackToPlaylistPopover';
import { useMobile } from '@/hooks/useMobile';
import { Button } from '../atoms/Button';
import { useMemo } from 'react';
import TrackParamsPopover from '../organisms/TrackParamsPopover';

type Props = {
  data: Track;
  index: number;
  tracks: Track[];
};

const TrackRow = ({ data, index, tracks }: Props) => {
  const { id, title, author, imagePath, createdAt, duration } = data;
  const setTrackId = usePlayer((state) => state.setTrackId);
  const setPlaylist = usePlayer((state) => state.setPlaylist);
  const { isMobile } = useMobile();
  const onPlayPause = usePlayer((state) => state.onPlayPause);
  const isPaused = usePlayer((state) => state.pause);
  const trackId = usePlayer((state) => state.currentTrackId);
  const { isActive, handleClick } = useAddToFavorite({
    trackId: id,
  });

  const Icon = useMemo(() => {
    if (id !== trackId) {
      return FaPlay;
    } else {
      return isPaused ? FaPlay : FaPause;
    }
  }, [trackId, isPaused]);

  return (
    <div
      className="@container/main"
      onClick={() => {
        if (isMobile) {
          setPlaylist(tracks);
          setTrackId(id);
          onPlayPause();
        }
      }}
    >
      <div className="@container px-4 py-1 gap-4  group grid grid-cols-[1fr_auto] @min-[600px]:grid-cols-[14px_minmax(180px,2fr)_minmax(50px,1fr)_minmax(50px,1fr)]   hover:bg-neutral-800 rounded-[8px]">
        <div className="relative hidden items-center  @min-[600px]/main:flex justify-self-end">
          <div className="relative size-4 flex justify-end">
            <p className="text-neutral-400 leading-none block text-[18px] font-medium tabular-nums select-none group-hover:opacity-0 group-hover:invisible">
              {index + 1}
            </p>
            <Button
              variant={'icon'}
              size={'icon'}
              className="absolute top-0 left-0 text-[16px] text-white invisible opacity-[0] group-hover:opacity-[1] group-hover:visible "
              onClick={() => {
                if (id !== trackId) {
                  // console.log('SET', id);
                  setPlaylist(tracks);
                  setTrackId(id);
                } else {
                  // console.log('PAUSE');

                  onPlayPause();
                }
              }}
            >
              <Icon />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={imagePath}
            alt="track"
            className="size-[48px] lg:size-[42px] rounded-[2px] "
          />
          <div className="flex flex-col gap-1">
            <p className="text-[16px] leading-none truncate">{title}</p>
            <p className="text-[13px] leading-none text-neutral-400 truncate">
              {author}
            </p>
          </div>
        </div>
        <div className="hidden @min-[600px]/main:flex  items-center justify-center text-neutral-400">
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-around ">
          <AddTrackToPlaylistPopover isActive={isActive}>
            <LikeButton
              isActive={isActive}
              onClick={handleClick}
              className={`
          hidden 
          opacity-0 
          @min-[600px]/main:block
          group-hover:opacity-100
          transition-none `}
            />
          </AddTrackToPlaylistPopover>

          <span className="hidden @min-[600px]/main:block text-neutral-400">
            {new Date(duration).toISOString().slice(11, 16) || '0:00'}
          </span>
          <TrackParamsPopover trackId={id}>
            <IoIosMore />
          </TrackParamsPopover>
        </div>
      </div>
    </div>
  );
};

export default TrackRow;
