import usePlayer from '@/store/usePlayer';
import TimeNumber from '../atoms/TimeNumber';

const TrackTimeSlider = () => {
  const time = usePlayer((state) => state.time);
  const duration = usePlayer((state) => state.duration);
  const onChangeTime = usePlayer((state) => state.onChangeTime);
  const onMute = usePlayer((state) => state.onMute);
  const onUnmute = usePlayer((state) => state.onUnmute);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <TimeNumber number={time} />
      </div>
      <div className="h-fit relative flex items-center group flex-1">
        <div
          className="h-full absolute top-0 left-0 bg-white group-hover:bg-primary rounded-full pointer-events-none "
          style={{
            width: `calc(100% * ${Number(time.toFixed(0)) / duration})`,
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
          max={duration}
          value={time}
          onChange={(e) => {
            onChangeTime(parseFloat(e.target.value));
          }}
          onMouseDown={() => {
            //   onPlayPause();
            onMute();
          }}
          onMouseUp={() => {
            //   onPlayPause();
            onUnmute();
          }}
          disabled={duration === 0}
        />
      </div>
      <div className="flex items-center">
        <TimeNumber number={duration} />
      </div>
    </div>
  );
};

export default TrackTimeSlider;
