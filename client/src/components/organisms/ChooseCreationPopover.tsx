import React, { useState } from 'react';
import { Popover } from '../atoms/Popover';
import useUploadModal from '@/store/useUploadModal';
import { Button } from '../atoms/Button';

type Props = {
  children: React.ReactNode;
  side?: 'top' | 'left' | 'bottom' | 'right';
};

const ChooseCreationPopover = ({ children, side = 'right' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useUploadModal();

  return (
    <Popover.Main
      isOpen={isOpen}
      onChange={(e) => {
        setIsOpen(e);
      }}
    >
      <Popover.Anchor>{children}</Popover.Anchor>
      <Popover.Content side={side} sideOffset={20} className="rounded-[8px]">
        <div className="flex flex-col gap-2">
          <Button variant={'default'} size={'default'} onClick={onOpen}>
            Track
          </Button>
          <Button variant={'default'} size={'default'}>
            Playlist
          </Button>
        </div>
      </Popover.Content>
    </Popover.Main>
  );
};

export default ChooseCreationPopover;
