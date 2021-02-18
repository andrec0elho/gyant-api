import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Case } from './schemas/case.schema';
import { ICaseSearch } from './interfaces';

@Injectable()
export class CaseRepository {
  constructor(@InjectModel('Case') private caseModel: Model<Case>) {}

  async search(query: ICaseSearch): Promise<Case[]> {
    Object.keys(query).forEach(key => {
      if (!query[key]) {
        delete query[key];
      }
    });

    try {
      return await this.caseModel.find(query).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
