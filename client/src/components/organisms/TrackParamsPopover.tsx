import React, { useState } from 'react';
import { Popover } from '../atoms/Popover';
import { Button } from '../atoms/Button';
import { useDeleteTrack } from '@/hooks/useTracks';
import useUpdateModal from '@/store/useUpdateTrackModal';
import { ConfirmDialog } from '../molecules/ConfirmDialog';

type Props = { children?: React.ReactNode; trackId: number };

const TrackParamsPopover = ({ children, trackId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useUpdateModal();
  const { mutateAsync: deleteTrack } = useDeleteTrack();

  return (
    <Popover.Main isOpen={isOpen} onChange={(e) => setIsOpen(e)}>
      <Popover.Anchor>{children}</Popover.Anchor>
      <Popover.Content>
        <Button
          onClick={() => {
            onOpen(trackId);
          }}
        >
          Update
        </Button>
        <ConfirmDialog
          title="Видалити трек?"
          description="Ця дія незворотна. Трек буде видалено назавжди, і ви не зможете його відновити."
          onConfirm={() => deleteTrack(trackId)}
        >
          <Button>Delete</Button>
        </ConfirmDialog>
      </Popover.Content>
    </Popover.Main>
  );
};

export default TrackParamsPopover;
