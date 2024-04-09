import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { configs } from 'src/config';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: configs.secret,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
