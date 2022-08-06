import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(dto: CreateAlbumDto) {
    const { name, artistId, year } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const createdAlbum = this.albumRepository.create({
      name,
      artistId,
      year,
    });

    return await this.albumRepository.save(createdAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async getById(albumId: string) {
    const findAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!findAlbum) {
      throw new NotFoundException('Album not found.');
    }

    return findAlbum;
  }

  async update(albumUniqueId: string, dto: UpdateAlbumDto) {
    const updatedAlbum = await this.albumRepository.findOne({
      where: { id: albumUniqueId },
    });
    if (!updatedAlbum) {
      throw new NotFoundException('album not found.');
    }

    if (!dto.name || typeof dto.year !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(updatedAlbum, dto);
    return updatedAlbum;
  }

  async delete(albumId: string) {
    const result = await this.albumRepository.delete(albumId);

    if (result.affected === 0) {
      throw new NotFoundException('Album not found.');
    }
  }
}
