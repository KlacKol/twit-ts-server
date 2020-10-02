import {Body, Controller, Post} from "@nestjs/common";

import { AuthService } from '../services';
import { UserLoginDto, UserRegistrationDto } from '../dto';
import {Users} from '../entities'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}
  @Post('login')
  async userLogin(@Body() user: UserLoginDto): Promise<Users | {status: number}> {
    return await this.authService.login(user);
  }

  @Post('registration')
  async userRegistration(@Body() user: UserRegistrationDto): Promise<Users> {
    const a = await this.authService.registration(user);
    console.log(a);
    return a
  }
}