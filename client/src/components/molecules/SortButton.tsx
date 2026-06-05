import { cn } from '@/lib/utils';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

interface SortHeaderProps {
  label: string;
  columnKey: string;
  currentSortKey: string | null;
  currentDirection: 'asc' | 'desc' | null;
  onSort: (key: string) => void;
  className?: string;
}

const SortButton = ({
  label,
  columnKey,
  currentSortKey,
  currentDirection,
  onSort,
  className = '',
}: SortHeaderProps) => {
  const isActive = currentSortKey === columnKey;

  return (
    <button
      onClick={() => onSort(columnKey)}
      className={cn(
        `group relative flex items-center gap-1 text-sm font-medium transition-colors truncate px-3`,
        isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white',
        className,
      )}
    >
      <span className="truncate">{label}</span>
      <div className="flex size-3 items-center justify-center text-[12px] text-primary absolute right-0">
        {isActive && currentDirection === 'asc' && <FaCaretUp />}
        {isActive && currentDirection === 'desc' && <FaCaretDown />}
      </div>
    </button>
  );
};

export default SortButton;
