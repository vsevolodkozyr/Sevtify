import PageTitle from '@/components/atoms/PageTitle';
import TracksList from '@/components/organisms/TracksList';
import PageContainer from '@/components/templates/PageContainer';
import { usePlaylist } from '@/hooks/usePlaylists';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const playlistId = Number(id);
  const isValidId = !isNaN(playlistId);

  const { isFetching, data, isError, error } = usePlaylist({
    id: isValidId ? playlistId : undefined,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Такий плейлист відсутній');
      console.error('Помилка завантаження плейлиста:', error?.message);
      navigate('/', { replace: true });
    }
  }, [isError, navigate, error]);

  if (isError) return null;

  return (
    <PageContainer>
      <PageTitle className="flex">
        <p className="truncate shrink-1">{data?.title}</p>
        <span>&nbsp;</span>
        <p className="shrink-0">playlist</p>
      </PageTitle>
      <div className="">
        <h2 className="text-[30px] font-medium mb-3">New arrivals</h2>

        {!data?.tracks.length && <h2 className="">Отакої, тут пусто!</h2>}
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
