import React, { useCallback, useEffect } from 'react';

type Props = {
  min: number;
  max: number;
  initial: number;
  colapsed?: boolean;
  colapseWidth?: number;
  direction?: 'default' | 'reverse';
};

const useResize = ({
  min,
  max,
  initial,
  colapsed,
  colapseWidth,
  direction = 'default',
}: Props) => {
  const isResizing = React.useRef(false);
  const [isColapsed, setIsColapsed] = React.useState(colapsed);
  const [value, setValue] = React.useState(initial);
  const startResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
  }, []);

  useEffect(() => {
    if (initial < min || initial > max) {
      throw new Error('Initial value must be between min and max');
    }
    if (colapseWidth) {
      if (initial < colapseWidth) {
        setIsColapsed(true);
        setValue(min);
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const width = widthCalculate(e, min, max, direction);

      if (colapseWidth) {
        if (width < colapseWidth && !isColapsed) {
          setValue(min);
          setIsColapsed(true);
        } else {
          setValue(width);
          if (isColapsed) {
            setIsColapsed(false);
          }
        }
      } else {
        setValue(width);
      }
    };

    const onMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [min, max]);

  return { startResize, min, max, value };
};

export default useResize;

function widthCalculate(
  e: MouseEvent,
  min: number,
  max: number,
  direction: 'default' | 'reverse',
): number {
  if (direction === 'default') {
    return Math.min(Math.max(e.clientX, min), max); //Math.min(Math.max(e.clientX, min), max)
  } else {
    return Math.min(Math.max(window.innerWidth - e.clientX, min), max);
  }
}
