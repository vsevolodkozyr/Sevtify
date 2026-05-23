import AddTrackToPlaylistPopover from '@/components/organisms/AddTrackToPlaylistPopover';
import MainLayout from '@/components/templates/MainLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import PlaylistPage from '@/pages/PlaylistPage';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import { Route, Routes } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PlayerProvider from '@/providers/PlayerProvider';
import Playlists from '@/pages/Playlists';
import SearchPage from '@/pages/SearchPage';
function App() {
  return (
    <>
      <PlayerProvider />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ToasterProvider />
      <ModalProvider />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlists/:id" element={<PlaylistPage />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
