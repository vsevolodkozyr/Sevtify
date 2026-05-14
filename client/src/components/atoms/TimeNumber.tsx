import { useMemo } from 'react';

type Props = {
  number: number;
};

const TimeNumber = ({ number }: Props) => {
  const time = useMemo(() => {
    return new Date(number * 1000).toLocaleTimeString().slice(3);
  }, [number]);
  return (
    <span className="text-neutral-400 leading-none tabular-nums text-[18px]">
      {time}
    </span>
  );
};

export default TimeNumber;
