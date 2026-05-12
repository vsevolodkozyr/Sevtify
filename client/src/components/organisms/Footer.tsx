import usePlayer from '@/store/usePlayer';
import TrackTimeSlider from '../molecules/TrackTimeSlider';
import { FaPause, FaPlay } from 'react-icons/fa';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Button } from '../atoms/Button';
import TrackVolumeSlider from '../molecules/TrackVolumeSlider';

const Footer = () => {
  const duration = usePlayer((state) => state.duration);
  const playPrev = usePlayer((state) => state.playPrev);
  const playNext = usePlayer((state) => state.playNext);
  const onPlayPause = usePlayer((state) => state.onPlayPause);
  const isPaused = usePlayer((state) => state.pause);
  return (
    <footer className="[grid-area:footer] p-5 grid grid-cols-[1fr_2fr_1fr] items-center">
      <div></div>
      <div className="max-w-125 mx-auto w-full">
        <div className="flex items-center gap-2 justify-center">
          <Button
            className="text-white text-[32px] disabled:text-neutral-400"
            variant={'icon'}
            size={'icon'}
            onClick={() => playPrev()}
            disabled={duration === 0}
          >
            <MdSkipPrevious />
          </Button>
          <Button
            className="text-white text-[24px] disabled:text-neutral-400 "
            variant={'icon'}
            size={'icon'}
            onClick={() => onPlayPause()}
            disabled={duration === 0}
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </Button>
          <Button
            className="text-white text-[32px] disabled:text-neutral-400"
            variant={'icon'}
            size={'icon'}
            onClick={() => playNext()}
            disabled={duration === 0}
          >
            <MdSkipNext />
          </Button>
        </div>
        <TrackTimeSlider />
      </div>
      <div className='place-self-end'>
        <TrackVolumeSlider />
      </div>
    </footer>
  );
};

export default Footer;
