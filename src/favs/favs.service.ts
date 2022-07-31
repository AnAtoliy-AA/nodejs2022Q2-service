import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { Favorites, FavoritesResponse, Resource } from './entities/fav.entity';

@Injectable()
export class FavsService {
  private favs: Favorites = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };

  findAll(
    tracks: TrackEntity[],
    artists: ArtistEntity[],
    albums: AlbumEntity[],
  ): FavoritesResponse {
    return {
      artists: artists.filter((artist) =>
        this.favs.artistsIds.includes(artist.id),
      ),
      albums: albums.filter((album) => this.favs.albumsIds.includes(album.id)),
      tracks: tracks.filter((track) => this.favs.tracksIds.includes(track.id)),
    };
  }

  private validateResourceAndGetById(id: string, resource: Resource) {
    const oneResource = resource.data.find((r) => r.id === id);

    if (oneResource == null) {
      throw new HttpException(
        `${resource.type} with id === ${id} don't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return oneResource;
  }

  private validateResourceAndDeleteById(id: string, resource: Resource) {
    const oneResource = resource.data.find((r) => r.id === id);

    if (oneResource == null) {
      throw new HttpException(
        `${resource.type} with id === ${id} not a favorite`,
        HttpStatus.NOT_FOUND,
      );
    }

    return true;
  }

  addTrack(id: string, tracks: TrackEntity[]) {
    const track = this.validateResourceAndGetById(id, {
      data: tracks,
      type: 'track',
    }) as TrackEntity;

    this.favs.tracksIds.push(id);

    return track;
  }

  removeTrack(id: string, tracks: TrackEntity[]) {
    this.validateResourceAndDeleteById(id, {
      data: tracks,
      type: 'track',
    });

    this.favs.tracksIds = this.favs.tracksIds.filter(
      (trackId) => trackId !== id,
    );
  }

  // artist
  addArtist(id: string, artists: ArtistEntity[]) {
    const artist = this.validateResourceAndGetById(id, {
      data: artists,
      type: 'artist',
    }) as ArtistEntity;

    this.favs.artistsIds.push(id);

    return artist;
  }

  removeArtist(id: string, artists: ArtistEntity[]) {
    this.validateResourceAndDeleteById(id, {
      data: artists,
      type: 'artist',
    });

    this.favs.artistsIds = this.favs.artistsIds.filter(
      (artistId) => artistId !== id,
    );
  }

  // album
  addAlbum(id: string, albums: AlbumEntity[]) {
    const album = this.validateResourceAndGetById(id, {
      data: albums,
      type: 'album',
    }) as AlbumEntity;

    this.favs.albumsIds.push(id);

    return album;
  }

  removeAlbum(id: string, albums: AlbumEntity[]) {
    this.validateResourceAndDeleteById(id, {
      data: albums,
      type: 'album',
    });

    this.favs.albumsIds = this.favs.albumsIds.filter(
      (albumId) => albumId !== id,
    );
  }
}
