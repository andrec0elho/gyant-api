import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/shared/controllers/base.controller';
import { CaseService } from './case.service';
import { SearchConditionQueryDto, SearchConditionResponseDto } from './dtos';
import { AuthGuard } from 'src/guards';
import { ApiResponse } from '@nestjs/swagger';

@Controller('case')
export class CaseController extends BaseController {
  constructor(private readonly caseService: CaseService) {
    super();
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: SearchConditionResponseDto,
  })
  searchConditions(@Query() query: SearchConditionQueryDto): Promise<SearchConditionResponseDto[]> {
    return this.caseService.searchConditions(query);
  }
}
