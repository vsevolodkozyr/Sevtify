import usePlayer from '@/store/usePlayer';
import FooterTrack from '../molecules/FooterTrack';
import LikeButton from '../molecules/LikeButton';
import useAddToFavorite from '@/hooks/useAddToFavorite';
import useNowPlayingModal from '@/store/useNowPlayingModal';
import FloatingProgress from '../atoms/FloatingProgress';
import AddTrackToPlaylistPopover from './AddTrackToPlaylistPopover';
const FloatingMobileTrack = () => {
  const trackId = usePlayer((state) => state.currentTrackId);
  const { isActive, handleClick } = useAddToFavorite({ trackId });
  const { onOpen } = useNowPlayingModal();
  if (!trackId) return null;

  return (
    <div className="px-2 w-full" onClick={onOpen}>
      <div className="px-2 py-1 pb-1.5 bg-neutral-700/80 rounded-[8px] relative overflow-hidden">
        <div className="flex items-center">
          <div className="flex-1">
            <FooterTrack />
          </div>
          <AddTrackToPlaylistPopover isActive={isActive}>
            <LikeButton
              isActive={isActive}
              onClick={handleClick}
              className={``}
            />
          </AddTrackToPlaylistPopover>
        </div>
        <div>
          <FloatingProgress />
        </div>
      </div>
    </div>
  );
};

export default FloatingMobileTrack;
