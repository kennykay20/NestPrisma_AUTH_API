import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../Guards/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../Guards/auth.guards';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class UsersModule {}
