import HomePage from '@/pages/HomePage';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
function App() {
  return (
    <>
      <ToasterProvider />
      <ModalProvider />
      <HomePage />
    </>
  );
}

export default App;
