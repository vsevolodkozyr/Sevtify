import { usePlaylists } from '@/hooks/usePlaylists';
import PlaylistCard from '../atoms/PlaylistCard';
import { useSidebar } from '@/store/useSidebar';
import { useState } from 'react';
import ControlledSearch from '../molecules/ControlledSearch';

const PlaylistsColumn = () => {
  const isCollapsed = useSidebar((state) => state.isCollapsed);
  const [search, setSearch] = useState('');
  const { data } = usePlaylists(search);

  console.log(data);
  return (
    <>
      <div className="px-2 mb-3 mt-1">
        <ControlledSearch
          className="text-[0.9rem] px-2 py-1"
          placeholder="Назва плейлисту"
          onSearch={(s) => setSearch(s)}
        />
      </div>
      {data ? (
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
      ) : (
        <h2>No playlists</h2>
      )}
    </>
  );
};

export default PlaylistsColumn;
