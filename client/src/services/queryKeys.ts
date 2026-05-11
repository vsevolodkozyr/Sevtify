export const trackKeys = {
  all: ['tracks'],
  detail: (id: number) => ['tracks', id],
  playlistStatus: (id: number) => ['tracks', id , 'playlist-status'],
};

export const playlistKeys = {
  all: ['playlists'],
  detail: (id: number) => ['playlists', id],
};
