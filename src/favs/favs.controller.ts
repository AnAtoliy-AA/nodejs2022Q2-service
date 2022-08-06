import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { ApiTags } from '@nestjs/swagger';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@ApiTags('Favourites')
@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  async findAll() {
    const tracks = this.trackService.findAll();
    const artists = this.artistService.findAll();
    const albums = this.albumService.findAll();
    return this.favsService.findAll(await tracks, await artists, await albums);
  }

  // track
  @Post('track/:id')
  async createTrack(@Param() id: string) {
    const tracks = this.trackService.findAll();
    return this.favsService.addTrack(id, await tracks);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param() id: string) {
    const tracks = this.trackService.findAll();
    return this.favsService.removeTrack(id, await tracks);
  }

  // artist
  @Post('artist/:id')
  async createArtist(@Param() id: string) {
    const artists = this.artistService.findAll();
    return this.favsService.addArtist(id, await artists);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() id: string) {
    const artists = this.artistService.findAll();
    return this.favsService.removeArtist(id, await artists);
  }

  // album
  @Post('album/:id')
  async addAlbum(@Param() id: string) {
    const albums = this.albumService.findAll();
    return this.favsService.addAlbum(id, await albums);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() id: string) {
    const albums = this.albumService.findAll();
    return this.favsService.removeAlbum(id, await albums);
  }
}
