import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDTO } from '../dto/auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDTO) {
    const { email, password } = dto;

    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    Logger.log(existUser);
    if (existUser) {
      throw new BadRequestException('Email already exist');
    }

    const hash = await this.hassPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword: hash,
      },
    });

    return { message: 'sign up user successfully' };
  }
  async signin() {
    return { message: 'sign in a user' };
  }
  async signout() {
    return { message: 'sign out a user' };
  }

  hassPassword = async (password: string) => {
    return await argon2.hash(password);
  };
}
