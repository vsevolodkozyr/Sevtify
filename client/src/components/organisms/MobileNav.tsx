import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { Link, useLocation } from 'react-router';
import type { IconType } from 'react-icons';
import ChooseCreationPopover from './ChooseCreationPopover';
import { FiPlus } from 'react-icons/fi';
import { IoLibrary } from 'react-icons/io5';
type NavLink = {
  type: 'link';
  icon: IconType;
  label: string;
  href: string;
};

type NavButton = {
  type: 'button';
  icon: IconType;
  label: string;
  onClick: () => void;
};

type NavCustom = {
  type: 'custom';
  label: string;
  component: React.ReactNode;
};

type NavItem = NavLink | NavButton | NavCustom;

const NavLinkItem = ({ icon: Icon, label, href }: NavLink) => {
  const location = useLocation();
  const active = location.pathname === href;
  return (
    <Link
      to={href}
      className={`flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-neutral-400'}`}
    >
      <Icon className="text-[24px]" />
      <span className="text-xs">{label}</span>
    </Link>
  );
};

const NavButtonItem = ({ icon: Icon, label, onClick }: NavButton) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1 text-neutral-400"
  >
    <Icon className="text-[24px]" />
    <span className="text-xs">{label}</span>
  </button>
);

const MobileNav = () => {
  const items: NavItem[] = useMemo(
    () => [
      {
        type: 'link',
        icon: HiHome,
        label: 'Home',
        href: '/',
      },
      {
        type: 'link',
        icon: IoLibrary,
        label: 'Library',
        href: '/playlists',
      },
      {
        type: 'custom',
        label: 'Create',
        component: (
          <ChooseCreationPopover side="top">
            <button className="flex flex-col items-center gap-1 text-neutral-400">
              <FiPlus className="text-[24px]" />
              <span className="text-xs">Create</span>
            </button>
          </ChooseCreationPopover>
        ),
      },
      {
        type: 'link',
        icon: BiSearch,
        label: 'Search',
        href: '/search',
      },
    ],
    [],
  );

  return (
    <nav className="flex justify-around items-center h-16 bg-neutral-900 border-t border-neutral-800">
      {items.map((item) => {
        if (item.type === 'link')
          return <NavLinkItem key={item.label} {...item} />;
        if (item.type === 'button')
          return <NavButtonItem key={item.label} {...item} />;
        if (item.type === 'custom')
          return <div key={item.label}>{item.component}</div>;
      })}
    </nav>
  );
};

export default MobileNav;
