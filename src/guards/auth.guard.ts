import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Unauthorized endpoint');
    }

    const key: string = this.configService.get('app.jwtSecretKey');

    try {
      jwt.verify(token, key);
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Unauthorized endpoint');
      }
      throw new BadRequestException('Token invalid signature');
    }
  }
}
