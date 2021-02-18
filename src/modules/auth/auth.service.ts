import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponseDto, LoginResquestBodyDto } from './dtos';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthUtilService } from './utils/auth-util.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly authUtilService: AuthUtilService) {}

  async login(body: LoginResquestBodyDto): Promise<LoginResponseDto> {
    const user: User = await this.userService.findUserByEmail(body.email);

    const validPassword = await this.validatePassword(body.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authUtilService.generateToken(user._id);

    return { token };
  }

  async validatePassword(loginPassword: string, realPassword: string): Promise<boolean> {
    return await bcrypt.compare(loginPassword, realPassword);
  }
}
