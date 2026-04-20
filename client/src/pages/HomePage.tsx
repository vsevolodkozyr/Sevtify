import TrackGrid from '@/components/organisms/TrackGrid';
import MainLayout from '@/components/templates/MainLayout';
import { useTracks } from '@/hooks/useTracks';

const HomePage = () => {
  const { isFetching, data } = useTracks();

  return (
    <MainLayout>
      {isFetching ? <div>Fetching</div> : <TrackGrid tracks={data} />}
    </MainLayout>
  );
};

export default HomePage;
