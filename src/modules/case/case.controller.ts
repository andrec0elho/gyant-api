import { Controller, Get, Query, UseGuards, Patch, Body, Param, Req } from '@nestjs/common';
import { BaseController } from '../../shared/controllers/base.controller';
import { CaseService } from './case.service';
import { SearchCaseQueryDto, SearchCaseResponseDto, UpdateCaseBodyDto, UpdateCaseParamsDto } from './dtos';
import { AuthGuard } from '../../guards';
import { ApiResponse } from '@nestjs/swagger';
import { AuthUtilService } from '../auth/utils/auth-util.service';
import { Request } from 'express';

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
  async updateCondition(@Req() request: Request, @Param() params: UpdateCaseParamsDto, @Body() body: UpdateCaseBodyDto): Promise<void> {
    const { caseId } = params;
    const userId = AuthUtilService.getUserFromToken(request);

    await this.caseService.updateCondition(caseId, userId, body);
  }
}
