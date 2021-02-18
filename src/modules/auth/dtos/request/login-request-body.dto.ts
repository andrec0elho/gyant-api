import { ApiProperty } from '@nestjs/swagger';

export class LoginResquestBodyDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
