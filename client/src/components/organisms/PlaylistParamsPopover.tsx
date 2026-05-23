import React, { useState } from 'react';
import { Popover } from '../atoms/Popover';
import { Button } from '../atoms/Button';
import { useDeleteTrack } from '@/hooks/useTracks';
import useUpdatePlaylistModal from '@/store/useUpdatePlaylistModal';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { useDeletePlaylist } from '@/hooks/usePlaylists';

type Props = { children?: React.ReactNode; playlistId: number };

const PlaylistParamsPopover = ({ children, playlistId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useUpdatePlaylistModal();
  const { mutateAsync: deletePlaylist } = useDeletePlaylist();

  return (
    <Popover.Main isOpen={isOpen} onChange={(e) => setIsOpen(e)}>
      <Popover.Anchor>{children}</Popover.Anchor>
      <Popover.Content>
        <Button
          onClick={() => {
            onOpen(playlistId);
          }}
        >
          Update
        </Button>

        <ConfirmDialog
          title="Видалити плейлист?"
          description="Ця дія незворотна. Плейлист буде видалено назавжди, і ви не зможете його відновити."
          onConfirm={() => deletePlaylist({ playlistId })}
        >
          <Button>Delete</Button>
        </ConfirmDialog>
      </Popover.Content>
    </Popover.Main>
  );
};

export default PlaylistParamsPopover;
