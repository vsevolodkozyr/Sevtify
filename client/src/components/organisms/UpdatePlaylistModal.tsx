import Modal from '../atoms/Modal';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

import toast from 'react-hot-toast';

import { usePlaylist, useUpdatePlaylist } from '@/hooks/usePlaylists';
import useUpdatePlaylistModal from '@/store/useUpdatePlaylistModal';
import PlaylistForm from '../molecules/PlaylistForm';

const UpdatePlaylistModal = () => {
  const { isOpen, onClose, playlistId } = useUpdatePlaylistModal();

  const { isPending, mutateAsync: updatePlaylist } = useUpdatePlaylist();

  const { data } = usePlaylist({ id: playlistId });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.image) {
        formData.append('imageFile', values.image[0]);
      }
      const result = await updatePlaylist({ id: playlistId, formData });
      toast.success(`Playlist  ${result.title} updated!`);
      onClose();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Modal
      title="Playlist"
      description="Create playlist"
      isOpen={isOpen}
      onChange={onChange}
    >
      <PlaylistForm
        onSubmit={onSubmit}
        isPending={isPending}
        playlist={data}
        isUpdate
      />
    </Modal>
  );
};

export default UpdatePlaylistModal;
