import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDTO } from '../dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { configs } from '../config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDTO) {
    const { email, password } = dto;

    try {
      const existUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existUser) {
        throw new BadRequestException('Email already exist');
      }

      const hash = await this.hashPassword(password);

      await this.prisma.user.create({
        data: {
          email,
          hashedPassword: hash,
        },
      });

      return { message: 'sign up user successfully' };
    } catch (error) {
      Logger.error(error);
      throw new Error('Failed to sign up user');
    }
  }
  async signin(dto: AuthDTO, req: Request, res: Response) {
    const { email, password } = dto;

    try {
      const existUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existUser) {
        throw new BadRequestException('Wrong email or password');
      }

      const isMatch = await this.verifyHashPassword(
        existUser.hashedPassword,
        password,
      );

      if (isMatch) {
        Logger.log('Password matched');
        // sign in jwt
        const payload = {
          userId: existUser.id,
          email: existUser.email,
        };
        const accessToken = await this.signInToken(payload);
        if (!accessToken) {
          throw new ForbiddenException();
        }
        res.cookie('PERM_AUTH', accessToken);
        res
          .status(200)
          .json({ message: 'login successfully', token: accessToken });
      } else {
        throw new BadRequestException('Password not match');
      }
    } catch (error) {
      Logger.error(error);
      throw new Error('Failed to sign in');
    }
  }
  async signout(req: Request, res: Response) {
    res.clearCookie('PERM_AUTH');
    return res.status(200).json({ message: 'Logged our successfully' });
  }

  hashPassword = async (password: string) => {
    try {
      return await argon2.hash(password);
    } catch (error) {
      Logger.error(error, 'Error hashing password:');
      throw new Error('Failed to hash password');
    }
  };

  verifyHashPassword = async (hash: any, password: string) => {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      Logger.error(error, 'Error verifying password:');
      throw new Error('Failed to verify password');
    }
  };

  signInToken = async (args: { userId: string; email: string }) => {
    try {
      const payload = { sub: args.userId, email: args.email };
      const accessToken = await this.jwt.signAsync(payload, {
        secret: configs.secret,
      });
      return accessToken;
    } catch (error) {
      Logger.error(error, 'Error verifying password:');
      throw new Error('Failed to verify password');
    }
  };
}
