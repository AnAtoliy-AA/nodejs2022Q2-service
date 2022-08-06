import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export interface Favorites {
  artistsIds: Array<string>;
  albumsIds: Array<string>;
  tracksIds: Array<string>;
}

export interface FavoritesResponse {
  artists: Array<ArtistEntity>;
  albums: Array<AlbumEntity>;
  tracks: Array<TrackEntity>;
}

export interface Resource {
  data: Array<ArtistEntity | AlbumEntity | TrackEntity>;
  type: string;
}
