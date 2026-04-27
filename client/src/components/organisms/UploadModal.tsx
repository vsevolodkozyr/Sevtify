import useUploadModal from '@/store/useUploadModal';
import Modal from '../atoms/Modal';
import { useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../atoms/Input';
import { Button } from '../atoms/Button';
import toast from 'react-hot-toast';
import { useCreateTrack } from '@/hooks/useTracks';
const UploadModel = () => {
  const { isOpen, onClose } = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const { isPending, mutateAsync: uploadTrack } = useCreateTrack();

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
      formData.append('image_path', values.image[0]);
      formData.append('track_path', values.track[0]);
      const result = await uploadTrack(formData);
      toast.success(
        `Track ${result.author} - ${result.title} - ${result.duration} added`,
      );
      onClose();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Modal
      title="Upload file"
      description="Upload audio file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          placeholder="Enter title"
          {...register('title', { required: true, value: 'Seva' })}
          disabled={isPending} // isPending here
        />
        <Input
          id="author"
          placeholder="Enter author"
          {...register('author', { required: true, value: 'Seva' })}
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
        <div className="flex flex-col gap-y-1">
          <span>Upload track</span>
          <Input
            id="track"
            type="file"
            accept=".mp3"
            disabled={isPending} // isPending here
            {...register('track', {
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

export default UploadModel;
