import { ApiPropertyOptional } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsBooleanValidator } from '../../../../shared/validators/is-boolean.validator';

export class UpdateCaseBodyDto {
  @ApiPropertyOptional()
  conditionId?: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  @Validate(IsBooleanValidator)
  evaluated?: boolean;
}
