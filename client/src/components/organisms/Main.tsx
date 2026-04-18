import Box from '../atoms/Box';

interface MainProps {
  children?: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="[grid-area:main] w-full h-full">
      <Box className="size-full bg-linear-to-b to-20% from-green-400/40 to-transparent">
        {children}
      </Box>
    </main>
  );
};

export default Main;
