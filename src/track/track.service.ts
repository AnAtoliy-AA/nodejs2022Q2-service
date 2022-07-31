import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(dto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const createdTrack = this.trackRepository.create({
      name,
      artistId,
      albumId,
      duration,
    });

    return await this.trackRepository.save(createdTrack);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async getById(trackId: string) {
    const findTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!findTrack) {
      throw new NotFoundException('Track not found.');
    }

    return findTrack;
  }

  async update(trackUniqueId: string, dto: UpdateTrackDto) {
    const updatedTrack = await this.trackRepository.findOne({
      where: { id: trackUniqueId },
    });
    if (!updatedTrack) {
      throw new NotFoundException('track not found.');
    }

    if (!dto.name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(updatedTrack, dto);
    return updatedTrack;
  }

  async delete(trackId: string) {
    const result = await this.trackRepository.delete(trackId);

    if (result.affected === 0) {
      throw new NotFoundException('Track not found.');
    }
  }

  async resetAlbumId(trackId: string, albumId: string) {
    const track = await this.getById(trackId);

    if (track.albumId === albumId) {
      track.albumId = null;
    }
  }

  async resetArtistId(trackId: string, artistId: string) {
    const track = await this.getById(trackId);

    if (track.artistId === artistId) {
      track.artistId = null;
    }
  }
}
