export interface User {
  id: number;
  username: string;
  lastPlayedSong: {
    id: number;
    position: number;
  };
  playlists: number[];
}

export interface Playlist {
  id: number;
  author_id: number;
  name: string;
  media: number[];
  created_at: string;
}

export interface Track {
  id: number;
  author: string;
  title: string;
  track_path: string;
  image_path: string;
}
