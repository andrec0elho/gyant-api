import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchCaseQueryDto, SearchCaseResponseDto, UpdateCaseBodyDto } from './dtos';
import { CaseRepository } from './case.repository';
import { Case } from './schemas/case.schema';
import { ICaseUpdate } from './interfaces';

@Injectable()
export class CaseService {
  constructor(private readonly caseRepository: CaseRepository) {}

  async searchCases(query: SearchCaseQueryDto): Promise<SearchCaseResponseDto[]> {
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

  async updateCase(caseId: string, userId: string, body: UpdateCaseBodyDto): Promise<void> {
    const caseDocument: Case = await this.caseRepository.getById(caseId);

    if (!caseDocument) {
      throw new NotFoundException('Case not found');
    }

    const { conditionId, evaluated } = body;

    const fieldsToUpdate: ICaseUpdate = {
      userId,
    };

    if (conditionId) {
      fieldsToUpdate.conditionId = conditionId;
    }

    if (evaluated) {
      fieldsToUpdate.evaluated = evaluated;
    }

    await this.caseRepository.updateById(caseId, fieldsToUpdate);
  }
}
