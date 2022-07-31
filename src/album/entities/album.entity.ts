import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Album identifier uuid v4', nullable: false })
  id: string;

  @Column()
  @ApiProperty({ description: 'Album name', nullable: false })
  name: string;

  @Column()
  @OneToOne(() => ArtistEntity, { eager: true })
  @ApiProperty({
    description: 'Album artistId refers to Artist',
    nullable: true,
  })
  artistId: string | null;

  @Column()
  @ApiProperty({
    description: 'Album duration integer number',
    nullable: false,
  })
  year: number;

  constructor(id: string, name: string, year: number, artistId: string | null) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.year = year;
  }
}
