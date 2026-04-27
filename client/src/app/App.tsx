import MainLayout from '@/components/templates/MainLayout';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import PlaylistPage from '@/pages/PlaylistPage';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import { Route, Routes } from 'react-router';
function App() {
  return (
    <>
      <ToasterProvider />
      <ModalProvider />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlists/:id" element={<PlaylistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
