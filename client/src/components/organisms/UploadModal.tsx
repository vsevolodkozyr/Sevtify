import useUploadModal from '@/store/useUploadModal';
import Modal from '../atoms/Modal';

const UploadModel = () => {
  const { isOpen, onClose } = useUploadModal();

  const onChange = (open: boolean) => {
    console.log(open);

    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Upload file"
      description="Upload audio file"
      isOpen={isOpen}
      onChange={onChange}
    >
      Upload
    </Modal>
  );
};

export default UploadModel;
