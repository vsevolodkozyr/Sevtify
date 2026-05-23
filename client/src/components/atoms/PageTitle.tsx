import { cn } from '@/lib/utils';
import React from 'react';

type Props = { className?: string; children?: React.ReactNode };

const PageTitle = ({ className = '', children }: Props) => {
  return (
    <h1
      className={cn('text-[clamp(30px,6cqw,46px)] mb-4 font-bold truncate', className)}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
