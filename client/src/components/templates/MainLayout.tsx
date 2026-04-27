import React from 'react';
import Sidebar from '../organisms/Sidebar';
import NowPlaying from '../organisms/NowPlaying';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Main from '../organisms/Main';
import { Outlet } from 'react-router';
interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="main_layout grid h-screen max-h-screen w-full px-[10px] overflow-hidden">
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
      <NowPlaying />
      <Footer />
    </div>
  );
};

export default MainLayout;
