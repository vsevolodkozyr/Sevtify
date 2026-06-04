import usePlayer from '@/store/usePlayer';
import { Howl } from 'howler';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const SERVER_ORIGIN = import.meta.env.VITE_SERVER_CONTENT_URL || '';

const PlayerProvider = () => {
  const {
    currentTrackUrl,
    setPlayer,
    playNext,
    setDuration,
    setPause,
    volume,
    currentTrackId,
  } = usePlayer();

  const setTime = usePlayer((state) => state.setTime);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!currentTrackUrl) return;
    if (interval.current) clearInterval(interval.current);

    const sound = new Howl({
      src: [`${SERVER_ORIGIN}${currentTrackUrl}`],
      html5: true,
      volume: volume,
      format: ['mp3'],
      onend: () => {
        // alert('NEXT');
        console.log('NEXT');

        playNext();
      },
      onloaderror: () => toast.error('Помилка завантаження аудіо'),
      onplayerror: () => toast.error('Помилка відтворення аудіо'),
    });

    setPlayer(sound);

    const handleUpdate = () => {
      if (sound.playing()) {
        setTime(sound.seek() as number);
      }
    };

    sound.once('load', () => {
      setDuration(sound?.duration() || 0);
      interval.current = setInterval(handleUpdate, 250);
      sound.play();
      setPause(false);
    });
    // sound.fade(1, 0.25, 10000);

    return () => {
      sound.unload();
      if (interval.current) clearInterval(interval.current);
    };
  }, [currentTrackId]);

  return null;
};

export default PlayerProvider;
