import { useMemo } from 'react';

type Props = {
  number: number | undefined;
};

const TimeNumber = ({ number = 0 }: Props) => {
  const time = new Date(number * 1000).toLocaleTimeString().slice(3);

  return (
    <span className="text-neutral-400 leading-none tabular-nums text-[18px]">
      {time || '00:00'}
    </span>
  );
};

export default TimeNumber;
