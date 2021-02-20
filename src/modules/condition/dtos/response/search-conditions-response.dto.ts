import { ApiProperty } from '@nestjs/swagger';

export class SearchConditionsResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;
}
