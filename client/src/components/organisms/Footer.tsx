import usePlayer from '@/store/usePlayer';
import TrackTimeSlider from '../molecules/TrackTimeSlider';
import { FaPause, FaPlay } from 'react-icons/fa';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { Button } from '../atoms/Button';
import TrackVolumeSlider from '../molecules/TrackVolumeSlider';
import FooterTrack from '../molecules/FooterTrack';
import MobileNav from './MobileNav';
import FloatingMobileTrack from './FloatingMobileTrack';

const Footer = () => {
  const duration = usePlayer((state) => state.duration);
  const playPrev = usePlayer((state) => state.playPrev);
  const playNext = usePlayer((state) => state.playNext);
  const onPlayPause = usePlayer((state) => state.onPlayPause);
  const isPaused = usePlayer((state) => state.pause);
  return (
    <footer className="[grid-area:footer] sm:relative fixed bottom-0 left-0 w-full ">
      <div className="p-5 gap-5 grid-cols-[1fr_2fr_1fr] items-center content-center hidden sm:grid ">
        <div>
          <FooterTrack />
        </div>
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
        <div className="flex items-center justify-end">
          <div className='max-w-[200px]'>
            <TrackVolumeSlider />
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="relative">
          <div className="absolute top-0 -translate-y-full w-full">
            <FloatingMobileTrack />
          </div>
          <MobileNav />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
