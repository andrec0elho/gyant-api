import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiProduces,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginResponseDto, LoginResquestBodyDto } from './dtos';

@Controller()
@ApiTags('auth')
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
  })
  login(@Body() body: LoginResquestBodyDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }
}
