import type { Track } from '@/types';

import { IoIosMore } from 'react-icons/io';

import LikeButton from './LikeButton';
import { FaPlay } from 'react-icons/fa';
import useAddToFavorite from '@/hooks/useAddToFavorite';
import usePlayer from '@/store/usePlayer';

type Props = {
  data: Track;
  index: number;
  tracks: Track[];
};

const TrackRow = ({ data, index, tracks }: Props) => {
  const { id, title, author, image_path, created_at, duration } = data;
  const setTrackId = usePlayer((state) => state.setTrackId);
  const setPlaylist = usePlayer((state) => state.setPlaylist);

  const { isActive, handleClick } = useAddToFavorite({
    trackId: id,
  });

  return (
    <div className="@container/main">
      <div className="@container px-4 py-1 gap-4  group grid grid-cols-[1fr_auto] @min-[600px]:grid-cols-[14px_minmax(180px,2fr)_minmax(50px,1fr)_minmax(50px,1fr)]   hover:bg-neutral-800 rounded-[8px]">
        <div className="relative hidden items-center  @min-[600px]/main:flex justify-self-end">
          <div className="relative size-4 flex justify-end">
            <p className="text-neutral-400 leading-none block text-[18px] font-medium tabular-nums select-none group-hover:opacity-0 group-hover:invisible">
              {index + 1}
            </p>
            <FaPlay
              onClick={() => {
                setPlaylist(tracks);
                setTrackId(id);
              }}
              className="absolute top-0 left-0 text-[16px] text-white invisible opacity-[0] group-hover:opacity-[1] group-hover:visible "
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={image_path}
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
          {new Date(created_at).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-around ">
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
          <span className="hidden @min-[600px]/main:block text-neutral-400">
            {new Date(duration).toISOString().slice(11, 16) || '0:00'}
          </span>
          <IoIosMore />
        </div>
      </div>
    </div>
  );
};

export default TrackRow;
