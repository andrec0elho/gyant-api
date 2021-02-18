import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
