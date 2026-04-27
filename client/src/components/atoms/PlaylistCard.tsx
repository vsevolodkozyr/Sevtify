import type { Playlist } from '@/types';

type Props = { data: Playlist };

const PlaylistCard = ({ data }: Props) => {
  const { title, image_path } = data;

  return (
    <div className="group flex items-center p-2 gap-2 hover:bg-neutral-800">
      <img className="w-16 rounded-[4px]" src={image_path} alt="" />
      <div>
        <p className="text-[16px] text-white truncate">{title}</p>
        <p className="text-[14px] text-neutral-400 leading-none truncate">
          <span>Playlist</span>
          {'*'}
          <span>0 tracks</span>
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
