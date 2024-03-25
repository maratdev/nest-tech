import { IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserDTO extends OmitType(CreateUserDTO, [
  'password',
] as const) {}
