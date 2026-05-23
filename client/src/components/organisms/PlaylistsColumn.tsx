import { usePlaylists } from '@/hooks/usePlaylists';
import PlaylistCard from '../atoms/PlaylistCard';
import { useSidebar } from '@/store/useSidebar';

const PlaylistsColumn = () => {
  const { data } = usePlaylists();
  const isCollapsed = useSidebar((state) => state.isCollapsed);
  if (!data) {
    return <h1>No playlists</h1>;
  }

  console.log(data);
  return (
    <div className=" grid grid-cols-1 ">
      {data.map((playlist) => {
        return (
          <PlaylistCard
            key={playlist.id}
            data={playlist}
            isCollapsed={isCollapsed}
          />
        );
      })}
    </div>
  );
};

export default PlaylistsColumn;
