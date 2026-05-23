import type { Track } from '@/types';
import TrackRow from '../molecules/TrackRow';

type Props = {
  tracks: Track[];
};

const TracksList = ({ tracks }: Props) => {
  console.log(tracks);

  return (
    <div className="">
      {tracks.map((track, index) => {
        return (
          track && (
            <TrackRow
              key={track.id}
              data={track}
              tracks={tracks}
              index={index}
            />
          )
        );
      })}
    </div>
  );
};

export default TracksList;
