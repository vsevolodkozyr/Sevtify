// import TrackGrid from '@/components/organisms/TrackGrid';
import TrackGrid from '@/components/organisms/TrackGrid';
import { useTracks } from '@/hooks/useTracks';
import { useEffect } from 'react';
// import { useTracks } from '@/hooks/useTracks';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { isFetching, data, isError, error } = useTracks();
  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error('Unable to fetch tracks');
      console.log(error?.message);
    }
  }, [isError]);

  return (
    <div className="@container p-6 size-full">
      <h1 className="text-[clamp(30px,6cqw,46px)] mb-4 font-bold">
        Welcome back, we missed you
      </h1>
      <div>
        <h2 className="text-[30px] font-medium mb-3">New arrivals</h2>
        {isFetching ? <div>Fetching</div> : <TrackGrid tracks={data ?? []} />}
      </div>
    </div>
  );
};

export default HomePage;
