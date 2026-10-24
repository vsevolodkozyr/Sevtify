import { cn } from '@/lib/utils';
import { serverContentUrl } from '@/lib/serverUrl';

type Props = {
  alt: string;
  className: string;
  src: string;
};

const Image = ({ src = '', alt = '', className = '', ...props }: Props) => {
  return (
    <img
      src={src ? serverContentUrl(src) : '/fallback/track.jfif'}
      alt={alt}
      className={cn('', className)}
      onError={(e) => {
        if (!e.currentTarget.src.endsWith('/fallback/track.jfif')) {
          e.currentTarget.src = '/fallback/track.jfif';
        }
      }}
      {...props}
    />
  );
};

export default Image;
