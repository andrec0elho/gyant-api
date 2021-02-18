import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiProduces, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto, LoginResquestBodyDto } from './dtos';
import { BaseController } from 'src/shared/controllers/base.controller';
import { ErrorDto } from 'src/shared/dtos/error.dto';

@Controller()
@ApiTags('auth')
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/login')
  @ApiResponse({
    status: 201,
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 403,
    type: ErrorDto,
  })
  @ApiResponse({
    status: 404,
    type: ErrorDto,
  })
  login(@Body() body: LoginResquestBodyDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }
}
