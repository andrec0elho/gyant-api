import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getById(userId: string): Promise<User> {
    try {
      return await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
