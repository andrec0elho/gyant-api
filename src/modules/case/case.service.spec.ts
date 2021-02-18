import { Test, TestingModule } from '@nestjs/testing';
import { CaseService } from './case.service';
import { CaseRepository } from './case.repository';
import { mock } from 'ts-mockito';
import { SearchConditionQueryDto, SearchConditionResponseDto } from './dtos';
import { Case } from './schemas/case.schema';
import { plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

describe('CaseService', () => {
  let service: CaseService;

  const mockCaseRepository = mock(CaseRepository);
  const mockCase = mock(Case);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: CaseService, useValue: new CaseService(mockCaseRepository) }],
    }).compile();

    service = module.get<CaseService>(CaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchConditions', () => {
    const mockQuery: SearchConditionQueryDto = { evaluated: true };

    const caseData = {
      evaluated: true,
      _id: '602e66c0ca179b3e3be06db6',
      description: 'uhfb',
      conditionId: '602e66c0ca179b3e3be06db4',
      userId: '602e66c0ca179b3e3be06db5',
      created: new Date(),
      updatedAt: new Date(),
    };

    const mockDataResponse = [caseData];

    function checkCaseRepositorySearchCall(spy) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ evaluated: mockQuery.evaluated });
    }

    it('should call repository search method and return undefined when no records are found', async () => {
      const caseRepositorySearchSpy = jest.spyOn(mockCaseRepository, 'search').mockResolvedValue([]);

      const result = await service.searchConditions(mockQuery);
      checkCaseRepositorySearchCall(caseRepositorySearchSpy);
      expect(result).not.toBeDefined();
    });

    it('should call repository search method and map the response into SearchConditionResponseDto', async () => {
      const caseRepositorySearchSpy = jest.spyOn(mockCaseRepository, 'search').mockResolvedValue(mockDataResponse as Case[]);

      const expectedResponse: SearchConditionResponseDto[] = [
        {
          evaluated: true,
          _id: '602e66c0ca179b3e3be06db6',
          description: 'uhfb',
          conditionId: '602e66c0ca179b3e3be06db4',
          userId: '602e66c0ca179b3e3be06db5',
        },
      ];

      const result = await service.searchConditions(mockQuery);
      checkCaseRepositorySearchCall(caseRepositorySearchSpy);
      expect(result).toHaveLength(mockDataResponse.length);
      expect(result).toEqual(expectedResponse);
    });
  });
});
