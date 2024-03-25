import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AutUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @HttpCode(201)
  @Post('register')
  register(@Body() createAuthDto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(createAuthDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AutUserResponse })
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<any> {
    return this.authService.loginUser(dto);
  }
}
