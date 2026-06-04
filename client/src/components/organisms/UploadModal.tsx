import useUploadModal from '@/store/useUploadModal';
import Modal from '../atoms/Modal';

import TrackFormFields from '../molecules/TrackFormFields';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

import toast from 'react-hot-toast';
import { useAddTrack } from '@/hooks/useTracks';

const UploadModel = () => {
  const { isOpen, onClose } = useUploadModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { isPending, mutateAsync: uploadTrack } = useAddTrack();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const formData = new FormData();
      console.log(formData);
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('genre', values.genre);
      formData.append('imageFile', values.image[0]);
      formData.append('trackFile', values.track[0]);
      const result = await uploadTrack(formData);
      toast.success(
        `Track ${result.author} - ${result.title} - ${result.duration} added`,
      );
      onClose();
    } catch {
      toast.error('Не вдалося створити трек!');
    }
  };

  return (
    <Modal
      onChange={onChange}
      title="Завантажити файл"
      description="Завантажити аудіо файл"
      isOpen={isOpen}
    >
      <TrackFormFields onSubmit={onSubmit} isPending={isPending} />
    </Modal>
  );
};

export default UploadModel;
