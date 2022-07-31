import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../ormconfig';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
      // validationSchema: Joi.object({
      //   POSTGRES_HOST: Joi.string().required(),
      //   POSTGRES_PORT: Joi.number().required(),
      //   POSTGRES_USER: Joi.string().required(),
      //   POSTGRES_PASSWORD: Joi.string().required(),
      //   POSTGRES_DB: Joi.string().required(),
      //   PORT: Joi.number(),
      // }),
    }),
    TypeOrmModule.forRoot(configService),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
