import { ApiProperty } from '@nestjs/swagger';

export class MyProfileResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;
}
