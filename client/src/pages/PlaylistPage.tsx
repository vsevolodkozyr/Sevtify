import PageTitle from '@/components/atoms/PageTitle';
import TracksList from '@/components/organisms/TracksList';
import PageContainer from '@/components/templates/PageContainer';
import { usePlaylist } from '@/hooks/usePlaylists';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';

const PlaylistPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { isFetching, data, isError, error } = usePlaylist({
    id: Number(id),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error('Такий плейлист відсутній');
      console.log(error?.message);
      navigate('/', { replace: true });
    }
  }, [isError]);
  return (
    <PageContainer>
      <PageTitle>{`${data?.title} playlist`}</PageTitle>
      <div>
        <h2 className="text-[30px] font-medium mb-3">New arrivals</h2>
        {isFetching ? (
          <div>Fetching</div>
        ) : (
          <TracksList tracks={data?.tracks ?? []} />
        )}
      </div>
    </PageContainer>
  );
};

export default PlaylistPage;
