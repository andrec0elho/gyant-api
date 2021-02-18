import { Controller, Get, Post, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '../../guards';
import { AuthUtilService } from '../auth/utils/auth-util.service';
import { MyProfileResponseDto } from './dtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/myprofile')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: MyProfileResponseDto,
  })
  getMyProfile(@Req() request: Request): Promise<MyProfileResponseDto> {
    const token = request.headers.authorization;

    const { userId } = AuthUtilService.decodeToken(token);

    if (!userId) {
      throw new BadRequestException('Invalid token signature');
    }

    return this.userService.getMyProfile(userId);
  }

  @Post()
  test2() {
    return this.userService.create({
      email: 'panados@panados.com',
      password: 'ejfkbecndicjkd',
    });
  }
}
