import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TrackModule, TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
