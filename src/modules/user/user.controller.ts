import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard) // проверка аторизован или нет пользователь
  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard) // проверка аторизован или нет пользователь
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    return this.userService.deleteUser(request.user.email);
  }
}
