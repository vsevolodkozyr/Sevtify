import { usePlaylists } from '@/hooks/usePlaylists';

import { cn } from '@/lib/utils';
import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import { useRef } from 'react';

import AddToPlaylist from '../molecules/AddToPlaylist';

// type Props = { trackId?: number };

const AddTrackToPlaylistPopover = () => {
  const { isOpen, trackId } = useAddTrackToPlaylistPopover();
  const { data } = usePlaylists();
  const ref = useRef<HTMLDivElement>(null);

  if (!trackId) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute top-0 left-0 bg-neutral-800 z-100',
        !isOpen && 'hidden',
      )}
    >
      <p>Add to playlist</p>
      {data?.map((playlist) => (
        <AddToPlaylist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default AddTrackToPlaylistPopover;
