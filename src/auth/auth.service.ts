import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    return { message: 'sign up a user' };
  }
  async signin() {
    return { message: 'sign in a user' };
  }
  async signout() {
    return { message: 'sign out a user' };
  }
}
