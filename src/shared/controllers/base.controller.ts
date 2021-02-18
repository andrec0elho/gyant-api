import { Controller } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from '../dtos/error.dto';

@ApiResponse({
  status: 500,
})
@ApiResponse({
  status: 400,
  type: ErrorDto,
})
@Controller()
export class BaseController {}
