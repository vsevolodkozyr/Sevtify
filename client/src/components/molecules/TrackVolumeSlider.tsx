import usePlayer from '@/store/usePlayer';
import { useMemo } from 'react';
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { Button } from '../atoms/Button';

const TrackVolumeSlider = () => {
  const volume = usePlayer((state) => state.volume);
  const setVolume = usePlayer((state) => state.setVolume);

  const VolumeIcon = useMemo(() => {
    if (volume >= 0.5) {
      return FaVolumeUp;
    } else if (volume < 0.5 && volume > 0) {
      return FaVolumeDown;
    } else {
      return FaVolumeMute;
    }
  }, [volume]);

  return (
    <div className="w-full flex gap-2 items-center">
      <Button
        className=" text-[24px] text-neutral-400"
        variant={'icon'}
        size={'icon'}
        onClick={() => setVolume(volume ? 0 : 0.5)}
      >
        <VolumeIcon />
      </Button>

      <div className="h-fit relative flex items-center group flex-1">
        <div
          className="h-full absolute top-0 left-0 bg-white group-hover:bg-primary rounded-full pointer-events-none "
          style={{
            width: `calc(100% * ${volume})`,
            transition: 'none',
          }}
        ></div>
        <input
          className="trackSlider w-full"
          type="range"
          name="volume"
          id="volume"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setVolume(val);
          }}
        />
      </div>
    </div>
  );
};

export default TrackVolumeSlider;
