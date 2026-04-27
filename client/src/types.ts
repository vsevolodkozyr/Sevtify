// export interface User {
//   id: number;
//   username: string;
//   lastPlayedSong: {
//     id: number;
//     position: number;
//   };
//   playlists: number[];
// }

export interface Playlist {
  id: number;
  title: string;
  image_path: string;
  tracksIds: number[];
  created_at: string;
}

export interface Track {
  id: number;
  author: string;
  title: string;
  track_path: string;
  image_path: string;
  duration: number;
  created_at: string;
}

export type PlaylistDetail = {
  id: number;
  title: string;
  image_path: string;
  created_at: string;
  tracks: Track[];
};
