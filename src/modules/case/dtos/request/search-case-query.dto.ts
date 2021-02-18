import { ApiPropertyOptional } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsBooleanValidator } from '../../../../shared/validators/is-boolean.validator';

export class SearchCaseQueryDto {
  @ApiPropertyOptional()
  @Validate(IsBooleanValidator)
  evaluated?: boolean;
}
