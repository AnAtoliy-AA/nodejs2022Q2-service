import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User identifier uuid v4', nullable: false })
  id: string | number;

  @Column()
  @ApiProperty({ description: 'User login', nullable: false })
  login: string;

  @Exclude()
  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'User password', nullable: false })
  password: string;

  @Column()
  @ApiProperty({
    description: 'User version integer number, increments on update',
    nullable: false,
  })
  version: number;

  // @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'User timestamp of creation', nullable: false })
  createdAt: number;

  // @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'User timestamp of last update',
    nullable: false,
  })
  updatedAt: number;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  constructor(
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: number,
    updatedAt: number,
    lastLoginAt: Date | null,
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = +createdAt;
    this.updatedAt = +updatedAt;
    this.lastLoginAt = lastLoginAt;
  }

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;

    return { id, login, version, createdAt, updatedAt };
  }
}
