import { Button } from '@/components/atoms/Button';
import PageTitle from '@/components/atoms/PageTitle';
import PlaylistCard from '@/components/atoms/PlaylistCard';
import ControlledSearch from '@/components/molecules/ControlledSearch';
import PageContainer from '@/components/templates/PageContainer';
import { useMobile } from '@/hooks/useMobile';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Playlists = () => {
  const [search, setSearch] = useState('');
  const { data, isError, isFetching, refetch } = usePlaylists(search);
  const { isMobile } = useMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile === false) {
      navigate('/', { replace: true });
    }
  }, [isMobile, navigate]);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 ">
        <PageTitle>Your library</PageTitle>
        <div className='mb-3'>
          <ControlledSearch
            placeholder="Введіть назву плейлиста"
            onSearch={(s) => setSearch(s)}
          />
        </div>
        {isError && !isFetching && <FetchError onClick={() => refetch()} />}
        {isFetching && <p>Fetching</p>}
        {data?.map((playlist) => {
          return <PlaylistCard key={playlist.id} data={playlist} />;
        })}
      </div>
    </PageContainer>
  );
};

function FetchError({ onClick }: { onClick: () => void }) {
  return (
    <div className="p-4 bg-red-900/20 text-red-400 rounded-md">
      <p className="mb-2">
        Unable to fetch playlists. Please check your connection.
      </p>
      <Button onClick={() => onClick()}>Try again</Button>
    </div>
  );
}

export default Playlists;
