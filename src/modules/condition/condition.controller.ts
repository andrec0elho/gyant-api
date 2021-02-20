import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from '../../shared/controllers/base.controller';
import { ConditionService } from './condition.service';
import { AuthGuard } from '../../guards';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchConditionsResponseDto } from './dtos';

@Controller('condition')
@ApiTags('condition')
export class ConditionController extends BaseController {
  constructor(private readonly conditionService: ConditionService) {
    super();
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: [SearchConditionsResponseDto],
  })
  searchConditions(): Promise<SearchConditionsResponseDto[]> {
    return this.conditionService.searchConditions();
  }
}
