import { usePlaylists } from '@/hooks/usePlaylists';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

import AddToPlaylist from '../molecules/AddToPlaylist';
import { Popover } from '../atoms/Popover';
import { Button } from '../atoms/Button';
import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import { useSavePlaylists } from '@/hooks/useSavePlaylists';

type Props = { children: React.ReactNode; isActive: boolean };

// type changePlaylist = {
//   number: number[];
// };

const AddTrackToPlaylistPopover = ({ children, isActive }: Props) => {
  const trackId = useAddTrackToPlaylistPopover((state) => state.trackId);
  const [isOpen, setOpen] = useState(false);
  const { data, error } = usePlaylists('');
  const [playlistsToChange, setPlaylistsToChange] = useState([]);

  const { handleSave } = useSavePlaylists(trackId, playlistsToChange);

  const handleClick = ({ id, method }: { id: number; method: boolean }) => {
    setPlaylistsToChange((old) => {
      const copy = JSON.parse(JSON.stringify(old));
      if (copy.find(({ id: i }) => i === id)) {
        return copy.filter(({ id: i }) => i !== id);
      } else {
        copy.push({ id, method });
        return copy;
      }
    });
  };

  return (
    <Popover.Main
      isOpen={isOpen}
      onChange={(e) => {
        if (isActive) setOpen(e);
        setPlaylistsToChange([]);
      }}
    >
      <Popover.Anchor>{children}</Popover.Anchor>
      <Popover.Content
        className={cn('bg-neutral-800 z-100 p-3 rounded-[8px] max-w-[200px]')}
      >
        {isActive === null || error ? (
          <h2>Помилка отримання даних</h2>
        ) : (
          <>
            <p className="text-[18px] font-bold mb-2">Add to playlist</p>
            <div className="flex flex-col gap-1">
              {data?.map((playlist) => (
                <AddToPlaylist
                  key={playlist.id}
                  playlist={playlist}
                  trackId={trackId}
                  handleClick={handleClick}
                />
              ))}
            </div>
            <Button
              onClick={() => {
                handleSave();
                setOpen(false);
              }}
            >
              Confirm
            </Button>
          </>
        )}
      </Popover.Content>
    </Popover.Main>
  );
};

export default AddTrackToPlaylistPopover;
