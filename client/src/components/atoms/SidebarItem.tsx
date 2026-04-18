import { cn } from '@/lib/utils';
import React from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router';

interface Props {
  icon: IconType;
  label: string;
  href: string;
  active?: boolean;
  isColapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active, isColapsed = false }: Props) => {
  return (
    <Link
      to={href}
      className={cn(
        'text-gray-300 flex flex-row gap-5 items-center',
        active && 'text-white',
        isColapsed && 'justify-center w-full',
      )}
    >
      <Icon className="text-[28px]" />
      <p className={cn('truncate text-[18px]', isColapsed && 'hidden')}>{label}</p>
    </Link>
  );
};

export default SidebarItem;
