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
import useUploadModal from '@/store/useUploadModal';
import { Button } from '../atoms/Button';
import PlaylistsColumn from './PlaylistsColumn';

const Sidebar = () => {
  const { onOpen } = useUploadModal();

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
        active: location.pathname === '/' || location.pathname !== '/search',
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
            <div className="flex justify-center items-center grow-1">
              {/* button */}
              <TbLayoutSidebarLeftExpand
                className={cn(
                  'hidden text-icon text-[32px] ',
                  isColapsed && 'block',
                )}
              />
            </div>
            <div
              className={cn(
                '@container flex justify-between items-center w-full',
                isColapsed && 'hidden',
              )}
            >
              <div className="flex gap-2 items-center">
                <Button variant={'icon'} size={'icon'}>
                  <TbLayoutSidebarLeftCollapse
                    className={cn(
                      'text-[24px] text-icon -translate-x-full opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 transition-[transform_opacity] duration-300 ease-in-out',
                    )}
                  />
                </Button>
                <span
                  className={cn(
                    'text-[20px] -translate-x-6 group-hover/sidebar:translate-x-0 transition-all duration-300 ease-in-out',
                  )}
                >
                  My library
                </span>
              </div>

              <Button
                variant={'icon'}
                size={'icon'}
                onClick={onOpen}
                className={cn(
                  'p-2 bg-neutral-400/20 rounded-full flex items-center gap-1 @min-[315px]:p-[8px_16px]',
                )}
              >
                <FiPlus className="text-[20px] text-icon" />
                <span className="hidden @min-[315px]:block">Create</span>
              </Button>
            </div>
          </div>

          <div className="grow  w-full overflow-y-auto overflow-x-hidden">
            <PlaylistsColumn />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
