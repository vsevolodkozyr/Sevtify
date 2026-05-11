import { usePlaylists } from '@/hooks/usePlaylists';

import { cn } from '@/lib/utils';
import useAddTrackToPlaylistPopover from '@/store/useAddTrackToPlaylistPopover';
import { useEffect, useRef } from 'react';

import AddToPlaylist from '../molecules/AddToPlaylist';

// type Props = { trackId?: number };

const AddTrackToPlaylistPopover = () => {
  const { isOpen, trackId, onClose } = useAddTrackToPlaylistPopover();
  const { data } = usePlaylists();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!trackId) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'fixed top-0 left-0 bg-neutral-800 z-100 p-3 rounded-[8px]',
        !isOpen && 'hidden',
      )}
    >
      <p className="text-[18px] font-bold mb-2">Add to playlist</p>
      <div className="flex flex-col gap-1">
        {data?.map((playlist) => (
          <AddToPlaylist key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default AddTrackToPlaylistPopover;
