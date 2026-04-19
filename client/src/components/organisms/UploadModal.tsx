import useUploadModal from '@/store/useUploadModal';
import Modal from '../atoms/Modal';
import { useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
const UploadModel = () => {
  const { isOpen, onClose } = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
      
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {};

  return (
    <Modal
      title="Upload file"
      description="Upload audio file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}></form>
    </Modal>
  );
};

export default UploadModel;
