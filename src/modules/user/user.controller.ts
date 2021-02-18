import { Controller, Get, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '../../guards';
import { AuthUtilService } from '../auth/utils/auth-util.service';
import { MyProfileResponseDto } from './dtos';
import { ApiResponse, ApiTags, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { BaseController } from '../../shared/controllers/base.controller';
import { ErrorDto } from 'src/shared/dtos/error.dto';

@Controller('user')
@ApiTags('user')
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('/my-profile')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: MyProfileResponseDto,
  })
  @ApiResponse({
    status: 403,
    type: ErrorDto,
  })
  @ApiResponse({
    status: 404,
    type: ErrorDto,
  })
  getMyProfile(@Req() request: Request): Promise<MyProfileResponseDto> {
    const token = request.headers.authorization;

    const { userId } = AuthUtilService.decodeToken(token);

    if (!userId) {
      throw new BadRequestException('Invalid token signature');
    }

    return this.userService.getMyProfile(userId);
  }
}
