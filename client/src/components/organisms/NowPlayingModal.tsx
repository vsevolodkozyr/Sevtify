import useNowPlayingModal from '@/store/useNowPlayingModal';
import Modal from '../atoms/Modal';
import usePlayer from '@/store/usePlayer';
import { useTrackById } from '@/hooks/useTracks';
import TrackTimeSlider from '../molecules/TrackTimeSlider';
import FooterTrack from '../molecules/FooterTrack';
import PlayerControls from '../molecules/PlayerControls';

const NowPlayingModal = () => {
  const { isOpen, onClose } = useNowPlayingModal();
  const trackId = usePlayer((state) => state.currentTrackId);
  const { data: trackInfo } = useTrackById(trackId);
  if (!trackId || !trackInfo) return null;
  const { image_path, title, author } = trackInfo;
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Now playing"
      description="Now playing modal"
      isOpen={isOpen}
      onChange={onChange}
      srOnly
      className="fadeIn"
    >
      <div className="size-full pt-7">
        <img
          src={image_path}
          alt={title}
          className={`
            w-full
            aspect-square
            rounded-[8px]

            `}
        />
        <div className="pt-10 flex flex-col gap-8">
          <FooterTrack />
          <PlayerControls scale={2} />
          <TrackTimeSlider />
        </div>
      </div>
    </Modal>
  );
};

export default NowPlayingModal;
