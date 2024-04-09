import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configs } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: configs.secret,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'perm_auth' in req.cookies) {
      return req.cookies.perm_auth;
    }
    return null;
  }

  async validate(payload: { id: string; email: string }) {
    return payload;
  }
}
