import PageTitle from '@/components/atoms/PageTitle';
import PlaylistCard from '@/components/atoms/PlaylistCard';
import PageContainer from '@/components/templates/PageContainer';
import { useMobile } from '@/hooks/useMobile';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Playlists = () => {
  const { data } = usePlaylists();
  const { isMobile } = useMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile === false) {
      navigate('/', { replace: true });
    }
  }, [isMobile]);

  if (!data) {
    return;
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-1 ">
        <PageTitle>Your library</PageTitle>
        {data.map((playlist) => {
          return <PlaylistCard key={playlist.id} data={playlist} />;
        })}
      </div>
    </PageContainer>
  );
};

export default Playlists;
