import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { MyProfileResponseDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getMyProfile(userId: string): Promise<MyProfileResponseDto> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      userId: user._id,
      name: user.name,
    };
  }
}
