import Modal from '../atoms/Modal';
import useF1Modal from '@/store/useF1Modal';

const F1Modal = () => {
  const { isOpen, onClose } = useF1Modal();

  const onChange = () => {
    onClose();
  };

  return (
    <Modal
      onChange={onChange}
      title="Довідка"
      description="Довідка по програмі"
      isOpen={isOpen}
    >
      <p className='text-[20px] truncate'>
        F1 – допомога <br />
        Entег – згода <br />
        Еsс – відмова  <br />
        Таb – перехід до наступного поля форми <br />
        Shift-Tab – повернення до попереднього поля<br />
      </p>
    </Modal>
  );
};

export default F1Modal;
