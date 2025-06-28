export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  userId: string | null;
}
