import type { Track } from '@/types';
import TrackCard from '../atoms/TrackCard';
interface Props {
  tracks: Track[];
}

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
        {tracks.map((track) => {
          return <TrackCard key={`${track.id}`} data={track} />;
        })}
      </div>
    </div>
  );
};

export default TrackGrid;
