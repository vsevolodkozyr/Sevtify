import { Button } from '@/components/atoms/Button';
import MainLayout from '@/components/templates/MainLayout';
import ModalProvider from '@/providers/ModalProvider';
function App() {
  return (
    <>
      <ModalProvider />
      <MainLayout>
        OHHHHHHHHHHHHH YEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSS
        <Button>Click Me!</Button>
      </MainLayout>
    </>
  );
}

export default App;
