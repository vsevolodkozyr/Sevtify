import useResize from '@/hooks/useResize';
import { useEffect } from 'react';
import Box from '../atoms/Box';

const NowPlaying = () => {
  const {
    startResize: startNowPlayingResize,
    min: nowPlayingMin,
    max: nowPlayingMax,
    value: nowPlayingValue,
    shadowValue: nowPlayingShadowValue,
    applyValue: setNowPlayingValue,
  } = useResize({
    min: 250,
    max: 420,
    initial: 280,
    direction: 'reverse',
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--now-playing-width',
      `${nowPlayingValue}px`,
    );
  }, [nowPlayingValue]);

  return (
    <div className="relative [grid-area:now_playing] hidden lg:block">
      <button
        className="absolute flex items-center justify-center right-full top-0 h-full w-[10px] bg-transparent cursor-grabbing focus-within:outline-2 focus-within:outline-white hover:bg-neutral-500/25 active:bg-neutral-500/25"
        onMouseDown={(e) => startNowPlayingResize(e)}
      >
        <div className="w-[5px] h-15 bg-gray-400 rounded-[8px]"></div>

        <label htmlFor="now-playing" className="sr-only">
          Resize Now Playing
          <input
            type="range"
            name="now-playing"
            id="now-playing"
            min={nowPlayingMin}
            max={nowPlayingMax}
            step={10}
            value={nowPlayingShadowValue}
            onChange={(e) => setNowPlayingValue(Number(e.target.value))}
          />
        </label>
      </button>
      <Box className='size-full'>Now playing</Box>
    </div>
  );
};

export default NowPlaying;
