import Input from '@/components/atoms/Input';
import PageTitle from '@/components/atoms/PageTitle';
import SortButton from '@/components/molecules/SortButton';
import TracksList from '@/components/organisms/TracksList';
import PageContainer from '@/components/templates/PageContainer';
import { usePlaylist } from '@/hooks/usePlaylists';
import { useSort } from '@/hooks/useSort';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const playlistId = Number(id);
  const isValidId = !isNaN(playlistId);
  const [searchParams, setSearchParams] = useState('');

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

  const { sortKey, sortDirection, handleSort } = useSort();

  const tracks = useMemo(() => {
    let tracks = data?.tracks;
    if (!tracks) return [];
    tracks = tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(searchParams.toLowerCase()) ||
        track.author.toLowerCase().includes(searchParams.toLowerCase()),
    );
    if (sortKey && sortDirection) {
      tracks = [...tracks].sort((a, b) => {
        const valueA = a[sortKey as keyof typeof a];
        const valueB = b[sortKey as keyof typeof b];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          const comparison = valueA.localeCompare(valueB);
          return sortDirection === 'asc' ? comparison : -comparison;
        }

        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return tracks;
  }, [searchParams, data, sortKey, sortDirection]);

  if (isError) return null;

  return (
    <PageContainer>
      <PageTitle className="flex">
        <p className="truncate shrink-1">{data?.title}</p>
        <span>&nbsp;</span>
        <p className="shrink-0">playlist</p>
      </PageTitle>
      <div className="">
        <h2 className="text-[30px] font-medium mb-3">Your playlist</h2>
        <div className="max-w-[555px] px-1 py-2">
          <Input
            className="px-2 py-1 bg-neutral-600/20"
            placeholder="Search tracks..."
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>

        <div className="@container px-4 py-1 gap-4  group grid grid-cols-[14px_minmax(0px,2fr)_minmax(0px,1fr)_minmax(0px,1fr)] text-[#b3b3b3] text-[12px] uppercase mb-2">
          <div className="text-[#b3b3b3]">#</div>

          <div>
            <SortButton
              label="Назва"
              columnKey="title"
              currentSortKey={sortKey}
              currentDirection={sortDirection}
              onSort={handleSort}
            />
          </div>

          <div className="w-full flex justify-center">
            <SortButton
              label="Дата додавання"
              columnKey="createdAt"
              currentSortKey={sortKey}
              currentDirection={sortDirection}
              onSort={handleSort}
            />
          </div>

          <div className="w-full flex justify-center">
            <SortButton
              label="Жанр"
              columnKey="genre"
              currentSortKey={sortKey}
              currentDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
        </div>

        {!tracks.length && <h2 className="">Отакої, тут пусто!</h2>}
        {isFetching ? <div>Fetching</div> : <TracksList tracks={tracks} />}
      </div>
    </PageContainer>
  );
};

export default PlaylistPage;
