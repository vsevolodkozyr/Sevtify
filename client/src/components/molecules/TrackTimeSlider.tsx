import usePlayer from '@/store/usePlayer';
import TimeNumber from '../atoms/TimeNumber';
import { memo, useState } from 'react';

const TrackTimeSlider = () => {
  const time = usePlayer((state) => state.time);
  const duration = usePlayer((state) => state.duration);
  const onChangeTime = usePlayer((state) => state.onChangeTime);
  const onMute = usePlayer((state) => state.onMute);
  const onUnmute = usePlayer((state) => state.onUnmute);
  const trackId = usePlayer((state) => state.currentTrackId);
  const [localTime, setLocalTime] = useState<number | null>(null);
  const displayTime = trackId ? (localTime !== null ? localTime : time) : 0;

  const flooredTime = trackId ? Math.floor(displayTime) : 0;
  const flooredDuration = trackId ? Math.floor(duration) : 1;

  const progressPercent =
    flooredDuration > 0 ? (flooredTime / flooredDuration) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <TimeNumber number={displayTime} />
      </div>
      <div className="h-fit relative flex items-center group flex-1">
        <div
          className="h-full absolute top-0 left-0 bg-white group-hover:bg-primary rounded-full pointer-events-none "
          style={{
            width: `calc(${progressPercent}%)`,
            transition: 'none',
          }}
        ></div>
        <input
          type="range"
          name="track-time"
          id="track-time"
          className={`
                trackSlider
                w-full
                h-1
                cursor-pointer
                `}
          min={0}
          max={duration || 100}
          value={flooredTime}
          step={1}
          onChange={(e) => {
            setLocalTime(parseInt(e.target.value, 10));
          }}
          onKeyDown={(e: KeyboardEvent) => {
            if (!['ArrowLeft', 'ArrowRight'].includes(e.code)) {
              return;
            }
            onMute();
          }}
          onMouseDown={() => {
            onMute();
          }}
          onTouchStart={() => {
            onMute();
          }}
          onPointerUp={(e) => {
            const finalTime = parseFloat(e.currentTarget.value);
            onChangeTime(finalTime);
            setLocalTime(null);
            onUnmute();
          }}
          onKeyUp={(e) => {
            if (!['ArrowLeft', 'ArrowRight'].includes(e.code)) {
              return;
            }
            const finalTime = parseFloat(e.currentTarget.value);
            onChangeTime(finalTime);
            setLocalTime(null);
            onUnmute();
          }}
          disabled={trackId === null}
        />
      </div>
      <div className="flex items-center">
        <TimeNumber number={trackId ? duration || 100 : 1} />
      </div>
    </div>
  );
};

export default memo(TrackTimeSlider);
