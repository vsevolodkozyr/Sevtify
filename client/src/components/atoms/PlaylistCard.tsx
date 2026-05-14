import type { Playlist } from '@/types';
import { Link } from 'react-router';

type Props = { data: Playlist };

const PlaylistCard = ({ data }: Props) => {
  const { id, title, image_path, tracksIds } = data;

  return (
    <Link to={`/playlists/${id}`}>
      <div className="group flex items-center p-2 gap-2 hover:bg-neutral-800">
        <img className="size-16 aspect-square object-cover rounded-[4px]" src={image_path} alt="" />
        <div>
          <p className="text-[16px] text-white truncate">{title}</p>
          <p className="text-[14px] text-neutral-400 leading-none truncate">
            <span>Playlist</span>
            {'*'}
            <span>{tracksIds.length} tracks</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
