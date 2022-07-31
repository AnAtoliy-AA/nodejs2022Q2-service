import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
    type: UserEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
    type: UserEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Not valid user id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User not found.',
  })
  findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No content' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
