import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Module({
  imports: [
    ArtistModule,
    TrackModule,
    AlbumModule,
    TypeOrmModule.forFeature([ArtistEntity, TrackEntity, AlbumEntity]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
