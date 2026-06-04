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
  imagePath: string;
  tracksIds: number[];
  deletable: boolean;
  createdAt: string;
}

export interface Track {
  id: number;
  author: string;
  title: string;
  genre: string;
  trackPath: string;
  imagePath: string;
  duration: number;
  createdAt: string;
}

export type PlaylistDetail = {
  id: number;
  title: string;
  imagePath: string;
  createdAt: string;
  deletable: boolean;
  tracks: Track[];
};
