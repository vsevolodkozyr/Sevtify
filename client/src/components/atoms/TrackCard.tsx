import type { Track } from '@/types';
import { Button } from './Button';
import { IoMdPlay } from 'react-icons/io';

type Props = {
  data: Track;
};

const TrackCard = ({ data }: Props) => {
  const { title, author, image_path } = data;

  return (
    <div className="@container group w-full flex flex-col gap-2 p-3 bg-neutral-800 rounded-[8px] overflow-hidden">
      <div className="w-full aspect-square overflow-hidden relative">
        <img
          className={`
            size-full
            rounded-[8px]
            object-cover
            `}
          src={image_path}
          alt={`Track ${title} - ${author}`}
        />
        <Button
          variant={'icon'}
          size={'icon'}
          className="absolute bottom-1 right-1  text-[13cqw] text-black bg-primary p-2 translate-y-1/2 opacity-0 group-hover:translate-0 group-hover:opacity-100"
        >
          <IoMdPlay className="" />
        </Button>
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
