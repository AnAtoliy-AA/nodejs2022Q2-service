import { UserEntity } from './../user/entities/user.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<void> {
    const { login, password }: RegisterDto = body;
    const user: UserEntity = await this.repository.findOne({
      where: { login },
    });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    this.repository.create({ login, password });
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { login, password }: LoginDto = body;
    const user: UserEntity = await this.repository.findOne({
      where: { login },
    });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: UserEntity): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}
