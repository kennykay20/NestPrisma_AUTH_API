import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  SignUp() {
    return this.authService.signup();
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
