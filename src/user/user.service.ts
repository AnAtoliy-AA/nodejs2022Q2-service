import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const { login, password } = dto;

    // const { login, password } = dto;
    // if (!login || !password) {
    //   throw new HttpException(
    //     'Empty login or password fields',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // const id = uuidv4();
    // const id = uuidv4();
    const version = 1;
    const createdAt: number = new Date().getTime();
    const updatedAt: number = new Date().getTime();
    const createdUser = this.userRepository.create({
      // id,
      login,
      password,
      version,
      createdAt,
      updatedAt,
    });
    // const user = new User(id, login, password, version, createdAt, updatedAt);
    // this._users.push(user);
    // const result = { ...user };
    // delete result.password;
    // return result;
    // return user;
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async getById(userId: string) {
    // const findUser = this._users.find((user) => user.id === userId);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // const result = { ...findUser };
    // delete result.password;
    return user.toResponse();
  }

  async update(userUniqueId: string, dto: UpdateUserDto) {
    if (!dto.newPassword || !dto.oldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedUser = await this.userRepository.findOne({
      where: { id: userUniqueId },
    });
    // const index = this._users.findIndex((user) => user.id == userUniqueId);
    // if (index === -1) {
    //   throw new NotFoundException('User not found.');
    // }
    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }
    // const { id, login, password, version, createdAt } = this._users[index];
    // if (dto.oldPassword !== password) {
    //   throw new HttpException('Not correct old password', HttpStatus.FORBIDDEN);
    // }
    // const updatedAt: number = new Date().getTime();
    // this._users[index] = new User(
    //   id,
    //   login,
    //   dto.newPassword,
    //   version + 1,
    //   createdAt,
    //   updatedAt,
    // );
    // const response = { ...this._users[index] };
    // delete response.password;
    Object.assign(updatedUser, dto);
    return updatedUser.toResponse();
  }

  async delete(userId: string) {
    // const filteredUsers = this._users.filter((user) => user.id !== userId);
    const result = await this.userRepository.delete(userId);
    //   if (this._users.length !== filteredUsers.length) {
    //     this._users = filteredUsers;
    //   } else {
    //     throw new NotFoundException('User not found.');
    //   }
    // }
    if (result.affected === 0) {
      throw new NotFoundException('User not found.');
    }
  }
}
