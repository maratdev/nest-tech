import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from '../../common/constants/errors';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { AutUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return this.userService.createUser(dto);
    } catch (err) {
      throw new Error(err);
    }
  }

  async loginUser(dto: UserLoginDto): Promise<AutUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (err) {
      throw new Error(err);
    }
  }
}
