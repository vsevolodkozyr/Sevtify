import { cn } from '@/lib/utils';
import React from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router';

interface Props {
  icon: IconType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: Props) => {
  return (
    <Link
      to={href}
      className={cn(
        'text-gray-300 flex flex-row gap-5 items-center',
        active && 'text-white',
      )}
    >
      <Icon className="text-[28px]" />
      <p className="truncate text-[18px]">{label}</p>
    </Link>
  );
};

export default SidebarItem;
