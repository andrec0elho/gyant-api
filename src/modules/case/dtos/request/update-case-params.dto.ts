import { ApiProperty } from '@nestjs/swagger';

export class UpdateCaseParamsDto {
  @ApiProperty()
  caseId: string;
}
