import React, { useEffect, useRef, useState } from 'react';
import Search from '../organisms/Search';
import { cn } from '@/lib/utils';

type Props = {
  onSearch: (status: string) => void;
  className?: string;
  placeholder?: string;
};

const ControlledSearch = ({
  onSearch,
  className = '',
  placeholder,
  ...props
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onSearch(inputValue);
    }, 350);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inputValue]);
  return (
    <Search
      className={cn('', className)}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder || ''}
      {...props}
    />
  );
};

export default ControlledSearch;
