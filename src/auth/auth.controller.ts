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
  SignIn(@Body() dto: AuthDTO) {
    return this.authService.signin(dto);
  }

  @Get('signout')
  Signout() {
    return this.authService.signout();
  }
}
