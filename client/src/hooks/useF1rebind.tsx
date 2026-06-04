import useF1Modal from '@/store/useF1Modal';
import { useCallback, useEffect } from 'react';

const useF1rebind = () => {
  const { onOpen, isOpen, onClose } = useF1Modal();

  const f1Rebind = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'F1' || e.keyCode === 112) {
        e.preventDefault();
        if (!e.repeat) {
          if (isOpen) {
            onClose();
          } else {
            onOpen();
          }
        }
      }
    },
    [isOpen, onClose, onOpen],
  );

  useEffect(() => {
    window.addEventListener('keydown', f1Rebind);
    return () => {
      window.removeEventListener('keydown', f1Rebind);
    };
  }, [f1Rebind]);
};

export default useF1rebind;
