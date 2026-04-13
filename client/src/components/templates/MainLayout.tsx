import useResize from '@/hooks/useResize';
import React, { useEffect } from 'react';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {


  const {
    startResize: startSidebarResize,
    min: sidebarMin,
    max: sidebarMax,
    value: sidebarValue,
  } = useResize({
    min: 72,
    max: 420,
    initial: 280,
    colapseWidth: 280,
  });

  const {
    startResize: startNowPlayingResize,
    min: nowPlayingMin,
    max: nowPlayingMax,
    value: nowPlayingValue,
  } = useResize({
    min: 250,
    max: 420,
    initial: 280,
    direction: 'reverse',
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--left-sidebar-width',
      `${sidebarValue}px`,
    );
  }, [sidebarValue]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--now-playing-width',
      `${nowPlayingValue}px`,
    );
  }, [nowPlayingValue]);

  return (
    <div className="main_layout text-black grid  h-screen w-full">
      <header className="bg-gray-300 [grid-area:header]">Header</header>

      <div className="relative bg-red-500 [grid-area:sidebar] hidden md:block">
        Sidebar
        <div
          className="absolute left-full top-0 h-full w-[10px] bg-gray-500 cursor-grabbing"
          onMouseDown={(e) => startSidebarResize(e)}
        >
          <label htmlFor="sidebar" className="hidden-visually">
            <input
              type="range"
              name=""
              id=""
              min={sidebarMin}
              max={sidebarMax}
              step={10}
              value={sidebarValue}
              onChange={() => {}}
            />
          </label>
        </div>
      </div>
      <main className="bg-blue-400 [grid-area:main]">
        Main content
        {children}
      </main>
      <div className="relative bg-purple-400 [grid-area:now_playing] hidden lg:block">
        Now Playing
        <div
          className="absolute right-full top-0 h-full w-[10px] bg-gray-500 cursor-grabbing"
          onMouseDown={(e) => startNowPlayingResize(e)}
        >
          <label htmlFor="now-playing" className="hidden-visually">
            <input
              type="range"
              name=""
              id=""
              min={nowPlayingMin}
              max={nowPlayingMax}
              step={10}
              value={nowPlayingValue}
              onChange={() => {}}
            />
          </label>
        </div>
      </div>

      <footer className="bg-gray-300 [grid-area:footer]">Footer</footer>
    </div>
  );
};

export default MainLayout;
