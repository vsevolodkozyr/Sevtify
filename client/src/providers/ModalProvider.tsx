import NowPlayingModal from '@/components/organisms/NowPlayingModal';
import PlaylistModal from '@/components/organisms/PlaylistModal';
import UpdatePlaylistModal from '@/components/organisms/UpdatePlaylistModal';
import UpdateTrackModal from '@/components/organisms/UpdateTrackModal';
import UploadModel from '@/components/organisms/UploadModal';

const ModalProvider = () => {
  return (
    <>
      <UploadModel />
      <PlaylistModal />
      <NowPlayingModal />
      <UpdateTrackModal />
      <UpdatePlaylistModal />
    </>
  );
};

export default ModalProvider;
