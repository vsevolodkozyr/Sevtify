import useResize from '@/hooks/useResize';

import React, { useEffect } from 'react';
import Sidebar from '../organisms/Sidebar';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
    <div className="main_layout text-black grid  h-screen w-full px-[10px]">
      <header className="bg-gray-300 [grid-area:header]">Header</header>

      <Sidebar />

      <main className="bg-blue-400 [grid-area:main]">
        Main content
        {children}
      </main>
      <div className="relative bg-purple-400 [grid-area:now_playing] hidden lg:block">
        Now Playing
        <button
          className="absolute right-full top-0 h-full w-[10px] bg-gray-500 cursor-grabbing "
          onMouseDown={(e) => startNowPlayingResize(e)}
        >
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
      </div>

      <footer className="bg-gray-300 [grid-area:footer]">Footer</footer>
    </div>
  );
};

export default MainLayout;
