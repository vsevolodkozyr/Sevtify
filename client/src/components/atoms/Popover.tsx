import { cn } from '@/lib/utils';
import * as PopoverUI from '@radix-ui/react-popover';
import type React from 'react';

type Props = {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
};

const PopoverMain = ({ isOpen, onChange, children, ...props }: Props) => {
  return (
    <PopoverUI.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
      {...props}
    >
      {children}
    </PopoverUI.Root>
  );
};

type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverUI.Content
>;

const PopoverContent = ({
  children,
  className,
  ...props
}: PopoverContentProps) => {
  return (
    <PopoverUI.Portal>
      <PopoverUI.Content
        className={cn(
          'p-2 bg-neutral-800 border-3 border-neutral-900',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverUI.Content>
    </PopoverUI.Portal>
  );
};

type PopoverAnchorProps = {
  children: React.ReactNode;
};

const PopoverAnchor = ({ children }: PopoverAnchorProps) => {
  return <PopoverUI.Trigger asChild={true}>{children}</PopoverUI.Trigger>;
};

export const Popover = {
  Main: PopoverMain,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
};
