import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  SignUp(@Body() dto: AuthDTO) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  SignIn() {
    return this.authService.signin();
  }

  @Get('signout')
  Signout() {
    return this.authService.signout();
  }
}
