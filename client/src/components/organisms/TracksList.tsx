import type { Track } from '@/types';
import TrackRow from '../molecules/TrackRow';

type Props = {
  tracks: Track[];
};

const TracksList = ({ tracks }: Props) => {
  return (
    <div className="">
      {tracks.map((track, index) => {
        return <TrackRow key={track.id} data={track} index={index} />;
      })}
    </div>
  );
};

export default TracksList;
