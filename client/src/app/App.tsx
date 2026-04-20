import { Button } from '@/components/atoms/Button';
import MainLayout from '@/components/templates/MainLayout';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
function App() {
  return (
    <>
      <ToasterProvider />
      <ModalProvider />
      <MainLayout>
        OHHHHHHHHHHHHH YEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSS
        <Button>Click Me!</Button>
      </MainLayout>
    </>
  );
}

export default App;
