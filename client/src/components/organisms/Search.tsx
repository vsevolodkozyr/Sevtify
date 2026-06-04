import { cn } from '@/lib/utils';
import Input from '../atoms/Input';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
};

const Search = ({ onChange, className = '', placeholder, ...props }: Props) => {
  return (
    <Input
      onChange={onChange}
      id="search"
      placeholder={placeholder || 'Enter title or author'}
      className={cn(
        `
    bg-neutral-800
      border-neutral-700
    `,
        className,
      )}
      {...props}
    />
  );
};

export default Search;
