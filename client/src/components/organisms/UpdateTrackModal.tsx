import Modal from '../atoms/Modal';
import { useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../atoms/Input';
import { Button } from '../atoms/Button';
import toast from 'react-hot-toast';
import { useTrackById, useUpdateTrack } from '@/hooks/useTracks';
import useUpdateModal from '@/store/useUpdateTrackModal';

const UpdateTrackModal = () => {
  const { isOpen, onClose, trackId } = useUpdateModal();
  const { data } = useTrackById(trackId);
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const { isPending, mutateAsync: updateTrack } = useUpdateTrack();

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
      formData.append('author', values.author);
      formData.append('imageFile', values.image[0]);
      const result = await updateTrack({ id: trackId, formData });
      toast.success(
        `Track ${result.author} - ${result.title} - ${result.duration} updated`,
      );
      onClose();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  if (!data) {
    return;
  }

  return (
    <Modal
      title="Update track"
      description="Update audio file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          placeholder="Enter title"
          {...register('title', { required: true, value: data?.title })}
          disabled={isPending} // isPending here
        />
        <Input
          id="author"
          placeholder="Enter author"
          {...register('author', { required: true, value: data?.author })}
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
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateTrackModal;
