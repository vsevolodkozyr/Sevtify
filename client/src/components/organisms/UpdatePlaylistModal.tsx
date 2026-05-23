import Modal from '../atoms/Modal';
import { useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../atoms/Input';
import { Button } from '../atoms/Button';
import toast from 'react-hot-toast';

import { usePlaylist, useUpdatePlaylist } from '@/hooks/usePlaylists';
import useUpdatePlaylistModal from '@/store/useUpdatePlaylistModal';

const UpdatePlaylistModal = () => {
  const { isOpen, onClose, playlistId } = useUpdatePlaylistModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const { isPending, mutateAsync: updatePlaylist } = useUpdatePlaylist();

  const { data } = usePlaylist({ id: playlistId });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('imageFile', values.image[0]);
      const result = await updatePlaylist({ id: playlistId, formData });
      toast.success(`Playlist  ${result.title} updated!`);
      onClose();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  if (!data) return;

  return (
    <Modal
      title="Playlist"
      description="Create playlist"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        className="flex flex-col gap-y-3 justify-center h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="title"
          placeholder="Enter title"
          {...register('title', { required: true, value: data.title })}
          disabled={isPending} // isPending here
        />

        <div className="flex flex-col gap-y-1">
          <span>Upload image</span>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isPending} // isPending here
            {...register('image', {
              required: true,
            })}
          />
        </div>
        <Button disabled={isPending} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UpdatePlaylistModal;
