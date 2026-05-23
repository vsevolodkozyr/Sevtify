import PageTitle from '@/components/atoms/PageTitle';
import Search from '@/components/organisms/Search';
import TracksList from '@/components/organisms/TracksList';
import PageContainer from '@/components/templates/PageContainer';
import { useTracks } from '@/hooks/useTracks';
import { useEffect, useRef, useState } from 'react';

const SearchPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const { data, isFetching } = useTracks(search);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearch(inputValue);
      console.log(inputValue);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inputValue]);

  return (
    <PageContainer>
      <PageTitle>Search what you really like</PageTitle>
      <div className="mb-5">
        <Search onChange={(e) => setInputValue(e.target.value)} />
      </div>
      <div>
        {isFetching ? <div>Fetching</div> : <TracksList tracks={data ?? []} />}
      </div>
    </PageContainer>
  );
};

export default SearchPage;
