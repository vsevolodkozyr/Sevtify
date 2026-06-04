import { cn } from '@/lib/utils';
import React from 'react';

type Props = { className?: string; children: React.ReactNode };

const PageContainer = ({ className = '', children }: Props) => {
  return (
    <div className={cn('@container p-6 size-full ', className)}>{children}</div>
  );
};

export default PageContainer;
