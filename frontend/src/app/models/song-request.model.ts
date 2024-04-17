export class SongRequest {
  id?: number; // Optional ID, if you want to assign an ID to each request
  songName: string;
  artist: string;
  album: string;
  userId: string; // User ID who made the request

  constructor(songName: string, artist: string, album: string, userId: string) {
    this.songName = songName;
    this.artist = artist;
    this.album = album;
    this.userId = userId;
  }
}
