// import useAddToFavorite from '@/hooks/useAddToFavorite';
import { Button } from '../atoms/Button';
import { cn } from '@/lib/utils';
import { FaCheck, FaPlus } from 'react-icons/fa';

type Props = {
  className?: string;
  // trackId: number;
  // playlistId?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
};

const LikeButton = ({
  className,
  onClick,
  isActive,
  handleClick,
  ...props
}: Props) => {
  // const { isActive: isLiked, handleClick } = useAddToFavorite({
  //   trackId,
  //   playlistId,
  // });

  return (
    <Button
      variant={'icon'}
      size={'icon'}
      onClick={(e) => {
        onClick?.(e);
        handleClick?.(e);
      }}
      className={cn(
        `
          relative
          cursor-pointer 
          text-[10px]
          text-neutral-400
          border
          border-neutral-400
          p-1
          `,
        isActive && 'bg-primary text-black border-primary',
        className,
      )}
      {...props}
    >
      {isActive ? <FaCheck /> : <FaPlus />}
    </Button>
  );
};

export default LikeButton;
