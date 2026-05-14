import usePlayer from '@/store/usePlayer';
import FooterTrack from '../molecules/FooterTrack';
import LikeButton from '../molecules/LikeButton';
import useAddToFavorite from '@/hooks/useAddToFavorite';
import * as Progress from '@radix-ui/react-progress';
import useNowPlayingModal from '@/store/useNowPlayingModal';
const FloatingMobileTrack = () => {
  const trackId = usePlayer((state) => state.currentTrackId);
  const { isActive, handleClick } = useAddToFavorite({ trackId });
  const duration = usePlayer((state) => state.duration);
  const time = usePlayer((state) => state.time);
  const { onOpen } = useNowPlayingModal();
  if (!trackId || !duration) return null;

  return (
    <div className="px-2 w-full" onClick={onOpen}>
      <div className="px-2 py-1 pb-1.5 bg-neutral-700/80 rounded-[8px] relative overflow-hidden">
        <div className="flex items-center">
          <div className="flex-1">
            <FooterTrack />
          </div>
          <LikeButton isActive={isActive} onClick={handleClick} />
        </div>
        <Progress.Root
          value={time}
          max={duration}
          className={`
            h-1
            w-full
            bg-neutral-800
            absolute
            bottom-0
            left-0
            overflow-hidden
            translate-z-0
            `}
        >
          <Progress.Indicator
            className="h-full bg-white"
            style={{ width: `calc(100% * ${time / duration})` }}
          />
        </Progress.Root>
      </div>
    </div>
  );
};

export default FloatingMobileTrack;
