import { useTrackById } from '@/hooks/useTracks';
import usePlayer from '@/store/usePlayer';

const FooterTrack = () => {
  const trackId = usePlayer((state) => state.currentTrackId);
  const { data: track } = useTrackById(trackId || 0);

  if (!track) {
    return null;
  }

  const { title, image_path, author } = track;

  return (
    <div className="flex gap-4 items-center">
      <img
        className={`size-16 aspect-square rounded-[8px]`}
        src={image_path}
        alt={title}
      />
      <div>
        <p className="font-bold truncate">{title}</p>
        <p className="text-neutral-400 truncate">{author}</p>
      </div>
    </div>
  );
};

export default FooterTrack;
