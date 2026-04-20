import type { Track } from '@/types';
interface Props {
  tracks: Track[];
}

const mock = Array(100).fill(1);

const TrackGrid = ({ tracks }: Props) => {
  if (!tracks.length) {
    return <p>No tracks</p>;
  }
  return (
    <div className="@container w-full ">
      <div
        className="grid
      grid-cols-1
      gap-3
      @min-[300px]:grid-cols-2
      @min-[530px]:grid-cols-3
      @min-[850px]:grid-cols-4
      @min-[1200px]:grid-cols-5
     "
      >
        {mock.map((item, index) => {
          return (
            <div key={`${item}_${index}`} className=" bg-primary">
              <div className="w-full aspect-square bg-red-400"></div>
              <p>title</p>
              <p>desc</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackGrid;
