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
  const [isColapsed, setIsColapsed] = React.useState(() => {
    if (colapseWidth && initial < colapseWidth) return true;
    return colapsed ?? false;
  });
  const [value, setValue] = React.useState(() => {
    if (colapseWidth && initial < colapseWidth) return min;
    return initial;
  });
  const [shadowValue, setShadowValue] = React.useState(initial);
  const startResize = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    isResizing.current = true;
  }, []);

  const applyValue = useCallback(
    (width: number) => {
      const clamped = Math.min(Math.max(width, min), max);
      setShadowValue(clamped);

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
    },
    [colapseWidth, min, max, isColapsed],
  );

  useEffect(() => {
    if (initial < min || initial > max) {
      throw new Error('Initial value must be between min and max');
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const width = widthCalculate(e, min, max, direction);
      applyValue(width);
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
  }, [min, max, direction]);

  return { startResize, min, max, value, applyValue, isColapsed, shadowValue };
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
