import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
