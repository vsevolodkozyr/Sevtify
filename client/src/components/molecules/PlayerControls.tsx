import { Button } from '../atoms/Button';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { FaPause, FaPlay } from 'react-icons/fa';
import usePlayer from '@/store/usePlayer';

type Props = {
  scale?: number;
};

const PlayerControls = ({ scale = 1 }: Props) => {
  const trackId = usePlayer((state) => state.currentTrackId);
  const playPrev = usePlayer((state) => state.playPrev);
  const playNext = usePlayer((state) => state.playNext);
  const onPlayPause = usePlayer((state) => state.onPlayPause);
  const isPaused = usePlayer((state) => state.pause);

  return (
    <div className="flex items-center gap-7 justify-center">
      <Button
        style={{ fontSize: 32 * scale + 'px' }}
        className="text-white text-[32px] disabled:text-neutral-400"
        variant={'icon'}
        size={'icon'}
        onClick={() => playPrev()}
        disabled={trackId === null}
      >
        <MdSkipPrevious />
      </Button>
      <Button
        style={{ fontSize: 24 * scale + 'px' }}
        className="text-white text-[24px] disabled:text-neutral-400 "
        variant={'icon'}
        size={'icon'}
        onClick={() => onPlayPause()}
        disabled={trackId === null}
      >
        {isPaused || trackId === null ? <FaPlay /> : <FaPause />}
      </Button>
      <Button
        style={{ fontSize: 32 * scale + 'px' }}
        className="text-white text-[32px] disabled:text-neutral-400"
        variant={'icon'}
        size={'icon'}
        onClick={() => playNext()}
        disabled={trackId === null}
      >
        <MdSkipNext />
      </Button>
    </div>
  );
};

export default PlayerControls;
