import TrackTimeSlider from '../molecules/TrackTimeSlider';

import TrackVolumeSlider from '../molecules/TrackVolumeSlider';
import FooterTrack from '../molecules/FooterTrack';
import MobileNav from './MobileNav';
import FloatingMobileTrack from './FloatingMobileTrack';
import PlayerControls from '../molecules/PlayerControls';

const IsolateTimeSlider = () => {
  return <TrackTimeSlider />;
};

const Footer = () => {
  return (
    <footer className="[grid-area:footer] sm:relative fixed bottom-0 left-0 w-full ">
      <div className="p-5 gap-5 grid-cols-[1fr_2fr_1fr] items-center content-center hidden sm:grid ">
        <div>
          <FooterTrack />
        </div>
        <div className="mx-auto w-full">
          <PlayerControls />
          <IsolateTimeSlider />
        </div>
        <div className="flex items-center justify-end">
          <div className="max-w-[200px]">
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
