import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const createdArtist = this.artistRepository.create({
      name,
      grammy,
    });

    return await this.artistRepository.save(createdArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async getById(artistId: string) {
    const findArtist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!findArtist) {
      throw new NotFoundException('Artist not found.');
    }

    return findArtist;
  }

  async update(artistUniqueId: string, dto: UpdateArtistDto) {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id: artistUniqueId },
    });
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found.');
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

    Object.assign(updatedArtist, dto);
    return updatedArtist;
  }

  async delete(artistId: string) {
    const result = await this.artistRepository.delete(artistId);

    if (result.affected === 0) {
      throw new NotFoundException('artist not found.');
    }
  }
}
