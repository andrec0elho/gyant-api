import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchConditionQueryDto {
  @ApiPropertyOptional()
  evaluated?: boolean;
}
