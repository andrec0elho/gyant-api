import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthUtilService {
  constructor(readonly configService: ConfigService) {}

  generateToken(userId: string): string {
    const key: string = this.configService.get('app.jwtSecretKey');

    const token: string = jwt.sign({ userId }, key, { expiresIn: '2h' });

    return token;
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
