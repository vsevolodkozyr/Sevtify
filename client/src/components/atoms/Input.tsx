import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
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
        `,
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
