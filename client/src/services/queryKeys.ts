export const trackKeys = {
  all: ['tracks'],
  detail: (id: number | null) => ['tracks', id],
  playlistStatus: (id: number | null) => ['tracks', id , 'playlist-status'],
};

export const playlistKeys = {
  all: ['playlists'],
  detail: (id: number | null | undefined) => ['playlists', id],
};
