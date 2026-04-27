import { usePlaylists } from '@/hooks/usePlaylists';
import PlaylistCard from '../atoms/PlaylistCard';

const PlaylistsColumn = () => {
  const { data } = usePlaylists();
  console.log(data);

  if (!data) {
    return <h1>No playlists</h1>;
  }

  return (
    <div className=" grid grid-cols-1 ">
      {data.map((playlist) => {
        return <PlaylistCard key={playlist.id} data={playlist} />;
      })}
    </div>
  );
};

export default PlaylistsColumn;
