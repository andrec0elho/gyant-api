import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchCaseResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  conditionId: string;

  @ApiPropertyOptional()
  userId: string;

  @ApiProperty()
  evaluated: boolean;
}
