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

export type TrackFilters = {
  search?: string;
  genre?: string;
  startDate?: string;
  endDate?: string;
};

export type PlaylistTrackStatus = Playlist & { isAdded: boolean };

export type PlaylistFormValues = { title: string; image?: FileList };
export type TrackFormValues = PlaylistFormValues & {
  author: string;
  genre: string;
  track?: FileList;
};

export type PlaylistDetail = {
  id: number;
  title: string;
  imagePath: string;
  createdAt: string;
  deletable: boolean;
  tracks: Track[];
};
