import usePlayer from '@/store/usePlayer';
import * as Progress from '@radix-ui/react-progress';

const FloatingProgress = () => {
  const duration = usePlayer((state) => state.duration);

  const time = usePlayer((state) => state.time);

  return (
    <Progress.Root
      value={time}
      max={duration}
      className={`
            h-1
            w-full
            bg-neutral-800
            absolute
            bottom-0
            left-0
            overflow-hidden
            translate-z-0
            `}
    >
      <Progress.Indicator
        className="h-full bg-white"
        style={{ width: `calc(100% * ${time / duration})` }}
      />
    </Progress.Root>
  );
};

export default FloatingProgress;
