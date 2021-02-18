import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchConditionResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  conditionId: string;

  @ApiPropertyOptional()
  userId: string;

  @ApiProperty()
  evalueated: boolean;
}
