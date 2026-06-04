import { cn } from '@/lib/utils';

type Props = {
  alt: string;
  className: string;
  src: string;
};

const SERVER_ORIGIN = import.meta.env.VITE_SERVER_CONTENT_URL || '';

const Image = ({ src = '', alt = '', className = '', ...props }: Props) => {
  return (
    <img
      src={`${SERVER_ORIGIN}${src}`}
      alt={alt}
      className={cn('', className)}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/fallback/track.jfif';
      }}
      {...props}
    />
  );
};

export default Image;
