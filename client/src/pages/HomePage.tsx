import { Button } from '@/components/atoms/Button';
import TrackGrid from '@/components/organisms/TrackGrid';
import PageContainer from '@/components/templates/PageContainer';
import { useTracks } from '@/hooks/useTracks';


const HomePage = () => {
  const { isFetching, data, isError, refetch } = useTracks('');

  return (
    <PageContainer>
      <h1 className="text-[clamp(30px,6cqw,46px)] mb-4 font-bold">
        Welcome back, we missed you
      </h1>
      <div>
        <h2 className="text-[30px] font-medium mb-3">Recently added</h2>
        {data?.length === 0 && <p>Треків не знайдено</p>}
        {isError && !isFetching && <FetchError onClick={() => refetch()} />}
        {isFetching ? <div>Fetching</div> : <TrackGrid tracks={data ?? []} />}
      </div>
    </PageContainer>
  );
};

function FetchError({ onClick }: { onClick: () => void }) {
  return (
    <div className="p-4 bg-red-900/20 text-red-400 rounded-md">
      <p className="mb-2">
        Unable to fetch tracks. Please check your connection.
      </p>
      <Button onClick={() => onClick()}>Try again</Button>
    </div>
  );
}

export default HomePage;
