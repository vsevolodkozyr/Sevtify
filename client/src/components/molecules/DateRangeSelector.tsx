type Props = {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
};

const DateRangeSelector = ({ startDate, endDate, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex flex-col gap-1">
        <label htmlFor="startDate" className="text-xs text-neutral-400 px-1">
          Від:
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          max={endDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          className="h-10 rounded-md border border-transparent bg-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={'endDate'} className="text-xs text-neutral-400 px-1">
          До:
        </label>
        <input
          id={'endDate'}
          type="date"
          value={endDate}
          onChange={(e) => onChange(startDate, e.target.value)}
          min={startDate}
          className="h-10 rounded-md border border-transparent bg-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
