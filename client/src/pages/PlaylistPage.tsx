import TracksList from '@/components/organisms/TracksList';
import { usePlaylist } from '@/hooks/usePlaylists';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';

const PlaylistPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { isFetching, data, isError, error } = usePlaylist({ id: Number(id) });

  useEffect(() => {
    if (isError) {
      toast.error('Unable to fetch tracks');
      console.log(error?.message);
    }
  }, [isError]);
  return (
    <div>
      <div className="@container p-6 size-full">
        <h1 className="text-[clamp(30px,6cqw,46px)] mb-4 font-bold">
          Welcome back, we missed you
        </h1>
        <div>
          <h2 className="text-[30px] font-medium mb-3">New arrivals</h2>
          {isFetching ? (
            <div>Fetching</div>
          ) : (
            <TracksList tracks={data?.tracks ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
