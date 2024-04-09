import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      Logger.log(`error fetch users `);
      throw new Error(error);
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) {
        throw new ForbiddenException(`user not found`);
      }
      return user;
    } catch (error) {
      Logger.log(`error fetching user with id ${id}`);
      throw new Error(error);
    }
  }
}
