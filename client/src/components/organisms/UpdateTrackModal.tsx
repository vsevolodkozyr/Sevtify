import Modal from '../atoms/Modal';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

import toast from 'react-hot-toast';
import { useTrackById, useUpdateTrack } from '@/hooks/useTracks';
import useUpdateModal from '@/store/useUpdateTrackModal';
import TrackFormFields from '../molecules/TrackFormFields';

const UpdateTrackModal = () => {
  const { isOpen, onClose, trackId } = useUpdateModal();
  const { data } = useTrackById(trackId);

  const { mutateAsync: updateTrack, isPending } = useUpdateTrack();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('genre', values.genre);
      if (values.image) {
        formData.append('imageFile', values.image[0]);
      }
      const result = await updateTrack({ id: trackId, formData });
      toast.success(
        `Track ${result.author} - ${result.title} - ${result.duration} updated`,
      );
      onClose();
    } catch {
      toast.error('Не вдалося оновити трек!');
    }
  };

  return (
    <Modal
      title="Оновити трек"
      description="Оновити відомості про трек"
      isOpen={isOpen}
      onChange={onChange}
    >
      <TrackFormFields
        onSubmit={onSubmit}
        isPending={isPending}
        isUpdate
        track={data}
      />
    </Modal>
  );
};

export default UpdateTrackModal;
