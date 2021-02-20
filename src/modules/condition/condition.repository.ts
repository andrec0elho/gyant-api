import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Condition } from './schemas/condition.schema';

@Injectable()
export class ConditionRepository {
  constructor(@InjectModel('Condition') private conditionModel: Model<Condition>) {}

  async getAll(): Promise<Condition[]> {
    try {
      return await this.conditionModel.find().exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
