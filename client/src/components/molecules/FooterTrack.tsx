import { useTrackById } from '@/hooks/useTracks';
import usePlayer from '@/store/usePlayer';
import Image from '../atoms/Image';
import { memo } from 'react';

const FooterTrack = () => {
  const trackId = usePlayer((state) => state.currentTrackId);
  const { data: track, error } = useTrackById(trackId);

  if (!trackId) {
    return null;
  }
  if (!track || error) {
    return <h2 className="text-[1.5rem]">Трек не знайдено</h2>;
  }

  const { title, imagePath, author } = track;

  return (
    <div className="flex gap-4 items-center">
      <Image
        className={`size-16 aspect-square rounded-[8px] object-cover`}
        src={imagePath}
        alt={title}
      />
      <div className="truncate">
        <p className="font-bold truncate">{title}</p>
        <p className="text-neutral-400 truncate">{author}</p>
      </div>
    </div>
  );
};

export default memo(FooterTrack);
