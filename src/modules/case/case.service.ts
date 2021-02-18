import { Injectable } from '@nestjs/common';
import { SearchConditionQueryDto, SearchConditionResponseDto } from './dtos';

@Injectable()
export class CaseService {
  searchConditions(query: SearchConditionQueryDto): Promise<SearchConditionResponseDto> {
    return undefined;
  }
}
