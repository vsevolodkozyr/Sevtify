import TrackGrid from '@/components/organisms/TrackGrid';
import MainLayout from '@/components/templates/MainLayout';
import { useTracks } from '@/hooks/useTracks';

const HomePage = () => {
  const { isFetching, data } = useTracks();

  return (
    <MainLayout>
      <div className="@container p-6 size-full">
        <h1 className="text-[clamp(30px,6cqw,46px)] mb-4 font-bold">
          Welcome back, we missed you
        </h1>
        {isFetching ? <div>Fetching</div> : <TrackGrid tracks={data} />}
      </div>
    </MainLayout>
  );
};

export default HomePage;
