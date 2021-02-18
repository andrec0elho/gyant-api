import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthUtilService } from './utils/auth-util.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthUtilService],
})
export class AuthModule {}
