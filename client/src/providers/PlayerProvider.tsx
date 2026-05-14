import usePlayer from '@/store/usePlayer';
import { Howl } from 'howler';
import { useEffect, useRef } from 'react';

const PlayerProvider = () => {
  const {
    currentTrackUrl,
    setPlayer,
    playNext,
    setDuration,
    setTime,
    setPause,
    volume,
  } = usePlayer();
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!currentTrackUrl) return;
    if (interval.current) clearInterval(interval.current);
    const handleUpdate = () => {
      setTime(sound?.seek() as number);
    };
    const sound = new Howl({
      src: [currentTrackUrl],
      html5: true,
      volume: volume,
      format: ['mp3'],
      onend: () => {
        playNext();
      },
    });

    setPlayer(sound);
    sound.once('load', () => {
      setDuration(sound?.duration() || 0);
      const intervalTemp = setInterval(handleUpdate, 150);
      interval.current = intervalTemp;
      sound.play();
      setPause(false);
    });
    // sound.fade(1, 0.25, 10000);

    return () => {
      sound.unload();
    };
  }, [currentTrackUrl]);

  return null;
};

export default PlayerProvider;
