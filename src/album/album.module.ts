import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TrackModule, TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
