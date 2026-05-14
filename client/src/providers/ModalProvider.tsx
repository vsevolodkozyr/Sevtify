import NowPlayingModal from '@/components/organisms/NowPlayingModal';
import PlaylistModal from '@/components/organisms/PlaylistModal';
import UploadModel from '@/components/organisms/UploadModal';

const ModalProvider = () => {
  return (
    <>
      <UploadModel />
      <PlaylistModal />
      <NowPlayingModal />
    </>
  );
};

export default ModalProvider;
