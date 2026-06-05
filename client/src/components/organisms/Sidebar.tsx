import { useEffect, useMemo } from 'react';
import useResize from '@/hooks/useResize';
import { useLocation } from 'react-router';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import SidebarItem from '../atoms/SidebarItem';
import Box from '../atoms/Box';
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';
import { cn } from '@/lib/utils';

import { Button } from '../atoms/Button';
import PlaylistsColumn from './PlaylistsColumn';
import ChooseCreationPopover from './ChooseCreationPopover';
import { useSidebar } from '@/store/useSidebar';
import Search from './Search';

const Sidebar = () => {
  const setIsCollapsed = useSidebar((state) => state.setIsCollapsed);

  const {
    startResize: startSidebarResize,
    min: sidebarMin,
    max: sidebarMax,
    value: sidebarValue,
    shadowValue: sidebarShadowValue,
    applyValue: setSidebarValue,
    isColapsed,
  } = useResize({
    min: 72,
    max: 420,
    initial: 300,
    colapseWidth: 280,
  });

  useEffect(() => {
    setIsCollapsed(isColapsed);
  }, [isColapsed]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--left-sidebar-width',
      `${sidebarValue}px`,
    );
  }, [sidebarValue]);

  const location = useLocation();

  const routes = useMemo(() => {
    return [
      {
        icon: HiHome,
        label: 'Home',
        active: location.pathname === '/',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: location.pathname === '/search',
        href: '/search',
      },
    ];
  }, [location]);

  return (
    <div className="group/sidebar relative [grid-area:sidebar] hidden md:block min-h-0 max-h-full h-full">
      <button
        className={
          'absolute flex items-center justify-center left-full top-0 h-full w-[10px] bg-transparent cursor-grabbing focus-within:outline-2 focus-within:outline-white hover:bg-neutral-500/25 active:bg-neutral-500/25'
        }
        onMouseDown={(e) => startSidebarResize(e)}
      >
        <div className="w-[5px] h-15 bg-gray-400 rounded-[8px]"></div>
        <label htmlFor="sidebar" className="sr-only">
          Resize Sidebar
          <input
            type="range"
            name="sidebar"
            id="sidebar"
            min={sidebarMin}
            max={sidebarMax}
            step={10}
            value={sidebarShadowValue}
            onChange={(e) => setSidebarValue(Number(e.target.value))}
          />
        </label>
      </button>
      <div className="flex flex-col h-full">
        <Box className=" mb-2.5">
          <div className="flex flex-col gap-4 px-5 py-4 shrink-0">
            {routes.map((route) => (
              <SidebarItem
                key={route.label}
                {...route}
                isColapsed={isColapsed}
              />
            ))}
          </div>
        </Box>
        <Box className="flex flex-col overflow-hidden h-full">
          <div className="flex items-center p-[16px_16px_8px] ">
            <div
              className={cn(
                '@container flex justify-between items-center w-full',
                isColapsed && 'truncate opacity-0 invisible',
              )}
            >
              <div className="flex gap-2 items-center">
                <span className={cn('text-[20px]')}>My library</span>
              </div>
              <ChooseCreationPopover>
                <Button
                  variant={'icon'}
                  size={'icon'}
                  className={cn(
                    'p-2 bg-neutral-400/20 rounded-full flex items-center gap-1 @min-[315px]:p-[8px_16px]',
                  )}
                >
                  <FiPlus className="text-[20px] text-icon" />
                  <span className="hidden @min-[315px]:block">Create</span>
                </Button>
              </ChooseCreationPopover>
            </div>
          </div>

          <div
            className="grow w-full overflow-y-auto overflow-x-hidden
          [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]
  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-white/20
  [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            <PlaylistsColumn />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
