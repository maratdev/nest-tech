import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
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

export class AutUserResponse {
  @ApiProperty()
  user: UserResponse;
  @ApiProperty()
  @IsString()
  token: string;
}
