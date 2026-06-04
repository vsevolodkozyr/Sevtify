import type { Playlist } from '@/types';
import { Link } from 'react-router';
import Image from './Image';
import { cn } from '@/lib/utils';
import PlaylistParamsPopover from '../organisms/PlaylistParamsPopover';
import { IoIosMore } from 'react-icons/io';
import { Button } from './Button';

type Props = { data: Playlist; isCollapsed?: boolean };

const PlaylistCard = ({ data, isCollapsed = false }: Props) => {
  const { id, title, imagePath, tracksIds } = data;

  return (
    <Link to={`/playlists/${id}`}>
      <div className="group flex items-center p-2 gap-2 hover:bg-neutral-800 truncate">
        <Image
          className="max-w-16 size-full aspect-square object-cover rounded-[4px]"
          src={imagePath}
          alt=""
        />
        <div className={cn('flex-1 truncate', isCollapsed && 'hidden')}>
          <p className="text-[16px] text-white truncate">{title}</p>
          <p className="text-[14px] text-neutral-400 leading-none truncate">
            <span>Playlist</span>
            {':'}
            <span>{tracksIds.length} tracks</span>
          </p>
        </div>
        {id !== 0 && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <PlaylistParamsPopover playlistId={id}>
              <Button
                variant={'icon'}
                size={'icon'}
                className="hit-area-[10px]"
              >
                <IoIosMore />
              </Button>
            </PlaylistParamsPopover>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PlaylistCard;
