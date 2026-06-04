import Input from '@/components/atoms/Input';
import PageTitle from '@/components/atoms/PageTitle';
import DateRangeSelector from '@/components/molecules/DateRangeSelector';
import Select from '@/components/molecules/SelectGenre';
import Search from '@/components/organisms/Search';
import TracksList from '@/components/organisms/TracksList';
import PageContainer from '@/components/templates/PageContainer';
import { useTracks } from '@/hooks/useTracks';
import { GENRES } from '@/lib/const';
import { useEffect, useRef, useState } from 'react';

const SearchPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState({
    search: '',
    genre: '',
    startDate: '',
    endDate: '',
  });
  const { data, isFetching } = useTracks(search);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearch({
        search: inputValue,
        genre: selectValue === 'all' ? '' : selectValue,
        startDate: startDate,
        endDate: endDate,
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inputValue, selectValue, startDate, endDate]);

  console.log(startDate, endDate);

  return (
    <PageContainer className="flex">
      <div className="flex flex-col w-full">
        <PageTitle>Search what you really like</PageTitle>
        <div className="mb-5 flex flex-col gap-2">
          <Search onChange={(e) => setInputValue(e.target.value)} />
          <div className="flex items-end gap-4 flex-wrap">
            <div className="max-w-[250px] flex-1">
              <Select
                options={[{ label: 'All', value: 'all' }, ...GENRES]}
                value={selectValue}
                onChange={(e) => setSelectValue(e)}
                placeholder={'Select genre'}
              />
            </div>
            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onChange={(startDate, endDate) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex">
          {!isFetching && data?.length === 0 && (
            <h2 className="self-center justify-self-center mx-auto text-primary text-[2rem]">
              Треків не знайдено
            </h2>
          )}
          {isFetching ? (
            <div>Fetching</div>
          ) : (
            data?.length > 0 && <TracksList tracks={data ?? []} />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;
