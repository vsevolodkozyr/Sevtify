import * as Dialog from '@radix-ui/react-dialog';
import { IoIosClose } from 'react-icons/io';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onChange, title, description, children }: Props) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      {/* <Dialog.Trigger /> */}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/30 fixed inset-0 backdrop-blur-[5px]" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
         bg-neutral-800 border border-neutral-700 rounded-md 
         size-full  md:max-w-[85vw] md:w-fit md:min-w-[45vw] md:max-h-[85vh] md:h-fit p-6"
        >
          <Dialog.Title className="text-center text-[24px] font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-center text-[18px] leading-normal mb-5 text-neutral-400">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
              absolute
              top-2
              right-2
              cursor-pointer
              appearance-none
              text-[40px]
              text-neutral-400 
              hover:text-white
              rounded-full
              hit-area-[15px]
              "
            >
              <IoIosClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

//
