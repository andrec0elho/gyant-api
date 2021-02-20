import { ApiPropertyOptional } from '@nestjs/swagger';
import { Validate, IsBoolean } from 'class-validator';
import { IsBooleanValidator } from '../../../../shared/validators/is-boolean.validator';

export class UpdateCaseBodyDto {
  @ApiPropertyOptional()
  conditionId?: string;

  @ApiPropertyOptional()
  // @Validate(IsBooleanValidator)
  @IsBoolean()
  evaluated?: boolean;
}
