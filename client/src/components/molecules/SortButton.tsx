
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
      className={`group relative flex items-center gap-1 text-sm font-medium transition-colors ${
        isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
      } ${className}`}
    >
      <span>{label}</span>
      <div className="flex w-3 items-center justify-center text-[12px] text-primary absolute right-0 translate-x-full">
        {isActive && currentDirection === 'asc' && <FaCaretUp />}
        {isActive && currentDirection === 'desc' && <FaCaretDown />}
      </div>
    </button>
  );
};

export default SortButton;
