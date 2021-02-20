import { Injectable } from '@nestjs/common';
import { ConditionRepository } from './condition.repository';
import { SearchConditionsResponseDto } from './dtos';

@Injectable()
export class ConditionService {
  constructor(private readonly conditionRepository: ConditionRepository) {}

  async searchConditions(): Promise<SearchConditionsResponseDto[]> {
    const conditions = await this.conditionRepository.getAll();

    return conditions.map(({ _id, name, code }): SearchConditionsResponseDto => ({ _id, name, code }));
  }
}
