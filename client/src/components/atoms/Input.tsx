import * as React from 'react';

import { cn } from '@/lib/utils';
import type { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        disabled={disabled}
        className={cn(
          `
        flex
        w-full
        p-3
        border
        border-neutral-400/50
        rounded-[8px]
        text-white
        text-[18px]
        focus-visible:outline-2
        focus-visible:outline-primary
        focus-visible:border-transparent
        `,
          error && 'border-red-500 text-red-500 ',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
