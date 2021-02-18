import { Controller, Get, Query, UseGuards, Patch, Body, Param } from '@nestjs/common';
import { BaseController } from '../../shared/controllers/base.controller';
import { CaseService } from './case.service';
import { SearchCaseQueryDto, SearchCaseResponseDto, UpdateCaseBodyDto, UpdateCaseParamsDto } from './dtos';
import { AuthGuard } from '../../guards';
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
    type: SearchCaseResponseDto,
  })
  searchConditions(@Query() query: SearchCaseQueryDto): Promise<SearchCaseResponseDto[]> {
    return this.caseService.searchConditions(query);
  }

  @Patch('/:caseId')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
  })
  async updateCondition(@Param() params: UpdateCaseParamsDto, @Body() body: UpdateCaseBodyDto): Promise<void> {
    const { caseId } = params;

    await this.caseService.updateCondition(caseId, body);
  }
}
