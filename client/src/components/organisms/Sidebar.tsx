import { useEffect, useMemo } from 'react';
import useResize from '@/hooks/useResize';
import { useLocation } from 'react-router';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import SidebarItem from '../atoms/SidebarItem';
import Box from '../atoms/Box';

const Sidebar = () => {
  const {
    startResize: startSidebarResize,
    min: sidebarMin,
    max: sidebarMax,
    value: sidebarValue,
    shadowValue: sidebarShadowValue,
    applyValue: setSidebarValue,
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
    <div className="relative  [grid-area:sidebar] hidden md:block">
      <button
        className={`absolute flex items-center justify-center left-full top-0 h-full
           w-[10px] bg:transparent cursor-grabbing focus-within:outline outline-white`}
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
      <Box>
        <div className="flex flex-col gap-4 px-5 py-4">
          {routes.map((route) => (
            <SidebarItem key={route.label} {...route} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
