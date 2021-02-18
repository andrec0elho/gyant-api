import { Injectable } from '@nestjs/common';
import { SearchCaseQueryDto, SearchCaseResponseDto, UpdateCaseBodyDto } from './dtos';
import { CaseRepository } from './case.repository';
import { Case } from './schemas/case.schema';

@Injectable()
export class CaseService {
  constructor(private readonly caseRepository: CaseRepository) {}

  async searchConditions(query: SearchCaseQueryDto): Promise<SearchCaseResponseDto[]> {
    const { evaluated } = query;
    const cases: Case[] = await this.caseRepository.search({ evaluated });

    if (!cases || cases.length === 0) {
      return undefined;
    }

    return cases.map(
      ({ _id, description, conditionId, userId, evaluated }): SearchCaseResponseDto => ({
        _id,
        description,
        conditionId,
        userId,
        evaluated,
      }),
    );
  }

  async updateCondition(caseId: string, body: UpdateCaseBodyDto): Promise<void> {
    return undefined;
  }
}
