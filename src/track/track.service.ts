import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class TrackService {
  private _tracks: TrackEntity[] = [];

  create(dto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAt: string = new Date(Date.now()).toDateString();
    const updatedAt: string = new Date(Date.now()).toDateString();
    const track = new TrackEntity(
      id,
      name,
      artistId || null,
      albumId || null,
      duration,
      createdAt,
      updatedAt,
    );
    this._tracks.push(track);
    return track;
  }

  findAll() {
    return this._tracks;
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
  }

  getById(trackId: string) {
    this.validateId(trackId);
    const findTrack = this._tracks.find((track) => track.id == trackId);

    if (!findTrack) {
      throw new NotFoundException('Track not found.');
    }

    return findTrack;
  }

  update(trackUniqueId: string, dto: UpdateTrackDto) {
    if (!validate(trackUniqueId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const index = this._tracks.findIndex((track) => track.id == trackUniqueId);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    if (!dto.name || typeof dto.duration !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, name, artistId, albumId, duration, createdAt } =
      this._tracks[index];

    const updatedAt: string = new Date(Date.now()).toDateString();

    this._tracks[index] = new TrackEntity(
      id,
      dto.name || name,
      dto.artistId || artistId || null,
      dto.albumId || albumId || null,
      dto.duration || duration,
      createdAt,
      updatedAt,
    );
    return this._tracks[index];
  }

  delete(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    const filteredTracks = this._tracks.filter((track) => track.id != trackId);

    if (this._tracks.length !== filteredTracks.length) {
      this._tracks = filteredTracks;
    } else {
      throw new NotFoundException('Track not found.');
    }
  }

  resetAlbumId(trackId: string, albumId: string) {
    const track = this.getById(trackId);

    if (track.albumId === albumId) {
      track.albumId = null;
    }
  }

  resetArtistId(trackId: string, artistId: string) {
    const track = this.getById(trackId);

    if (track.artistId === artistId) {
      track.artistId = null;
    }
  }
}
