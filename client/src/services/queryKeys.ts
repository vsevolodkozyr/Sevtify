export const trackKeys = {
  all: ['tracks'],
};

export const playlistKeys = {
  all: ['playlists'],
  detail: (id: number) => ['playlists', id],
};
