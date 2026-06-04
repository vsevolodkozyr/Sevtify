import Modal from '../atoms/Modal';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

import toast from 'react-hot-toast';
import usePlaylistModal from '@/store/usePlaylistModal';
import { useAddPlaylist } from '@/hooks/usePlaylists';
import PlaylistForm from '../molecules/PlaylistForm';

const PlaylistModal = () => {
  const { isOpen, onClose } = usePlaylistModal();

  const { isPending, mutateAsync: uploadPlaylist } = useAddPlaylist();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('imageFile', values.image[0]);
      const result = await uploadPlaylist(formData);
      toast.success(`Playlist  ${result.title} added`);
      onClose();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Modal
      title="Створити плейлист"
      description="Створити плейлист для зберігання треків"
      isOpen={isOpen}
      onChange={onChange}
    >
      <PlaylistForm onSubmit={onSubmit} isPending={isPending} />
    </Modal>
  );
};

export default PlaylistModal;
