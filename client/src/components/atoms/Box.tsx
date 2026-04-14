import { cn } from '@/lib/utils';

type Props = { className?: string; children?: React.ReactNode };

const Box = ({ className, children }: Props) => {
  return (
    <div className={cn('bg-gray-600/30 rounded-[8px]', className)}>
      {children}
    </div>
  );
};

export default Box;
